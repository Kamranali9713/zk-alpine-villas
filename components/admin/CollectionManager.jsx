"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMedia } from "@/lib/upload";

export function CollectionManager({
  table,
  title,
  description,
  fields,
  fixedValues = {},
  filter = {},
  orderBy = "sort_order",
  emptyRow,
}) {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState(null);

  async function load() {
    setLoading(true);
    let query = supabase.from(table).select("*").order(orderBy, { ascending: true });
    Object.entries(filter).forEach(([k, v]) => {
      query = query.eq(k, v);
    });
    const { data } = await query;
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openNew() {
    setEditing({ ...emptyRow, ...fixedValues, ...filter });
  }

  function openEdit(row) {
    setEditing({ ...row });
  }

  async function handleSave() {
    if (!editing) return;
    setSaving(true);
    const payload = { ...editing, ...fixedValues, ...filter };
    const isNew = !payload.id;
    if (isNew) delete payload.id;

    const { error } = isNew
      ? await supabase.from(table).insert([payload])
      : await supabase.from(table).update(payload).eq("id", payload.id);

    setSaving(false);
    if (error) {
      alert(`Could not save: ${error.message}`);
      return;
    }
    setEditing(null);
    load();
  }

  async function handleDelete(row) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id);
    if (error) {
      alert(`Could not delete: ${error.message}`);
      return;
    }
    load();
  }

  async function handleImageUpload(key, file) {
    setUploadingKey(key);
    try {
      const url = await uploadMedia(supabase, file);
      setEditing((prev) => (prev ? { ...prev, [key]: url } : prev));
    } catch (e) {
      alert(`Upload failed: ${e.message}`);
    }
    setUploadingKey(null);
  }

  const titleField = fields.find((f) => f.type === "text")?.key ?? "title";

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl text-ink mb-1">{title}</h1>
          {description && <p className="text-sm text-slate">{description}</p>}
        </div>
        <button
          onClick={openNew}
          className="shrink-0 rounded-sm bg-pine text-cloud px-5 py-2.5 text-sm hover:bg-pineLight transition-colors"
        >
          + Add New
        </button>
      </div>

      {loading ? (
        <p className="text-slate text-sm">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-slate">
          Nothing here yet. Click &quot;Add New&quot; to create the first item.
        </div>
      ) : (
        <div className="bg-cloud border border-ink/10 rounded-sm divide-y divide-ink/10">
          {rows.map((row) => (
            <div key={row.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-4 min-w-0">
                {row.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={row.image_url} alt="" className="w-12 h-12 object-cover rounded-sm shrink-0" />
                )}
                <div className="min-w-0">
                  <div className="text-ink truncate">{row[titleField] ?? row.name ?? row.question ?? "Untitled"}</div>
                  {"is_active" in row && (
                    <span className={`text-xs ${row.is_active ? "text-pine" : "text-slate"}`}>
                      {row.is_active ? "Published" : "Hidden"}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(row)} className="text-sm text-pine hover:underline">
                  Edit
                </button>
                <button onClick={() => handleDelete(row)} className="text-sm text-clay hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 bg-ink/50 flex items-center justify-center p-4">
          <div className="bg-cloud rounded-sm w-full max-w-lg max-h-[90vh] overflow-y-auto p-8">
            <h2 className="font-display text-xl text-ink mb-6">
              {editing.id ? "Edit" : "Add"} {title.replace(/s$/, "")}
            </h2>

            <div className="space-y-4">
              {fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm text-slate mb-1.5">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
                    />
                  ) : f.type === "select" ? (
                    <select
                      value={editing[f.key] ?? f.options?.[0]}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
                    >
                      {f.options?.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  ) : f.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={!!editing[f.key]}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                      className="w-5 h-5"
                    />
                  ) : f.type === "image" ? (
                    <div>
                      {editing[f.key] && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={editing[f.key]} alt="" className="w-full aspect-video object-cover rounded-sm mb-2" />
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(f.key, file);
                        }}
                        className="text-sm"
                      />
                      {uploadingKey === f.key && <p className="text-xs text-slate mt-1">Uploading…</p>}
                    </div>
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      required={f.required}
                      value={editing[f.key] ?? ""}
                      onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                      className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-sm bg-pine text-cloud px-5 py-2.5 text-sm hover:bg-pineLight transition-colors disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save"}
              </button>
              <button
                onClick={() => setEditing(null)}
                className="rounded-sm border border-ink/15 px-5 py-2.5 text-sm text-ink hover:border-pine transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
