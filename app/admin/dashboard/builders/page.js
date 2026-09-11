"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { uploadMedia } from "@/lib/upload";

const EMPTY_BUILDER = {
  name: "",
  title: "",
  company: "",
  bio: "",
  phone: "",
  email: "",
  address: "",
  image_url: "",
  is_active: true,
  sort_order: 0,
};

export default function BuildersPage() {
  const supabase = createClient();

  const [builders, setBuilders] = useState([]);
  const [builder, setBuilder] = useState(EMPTY_BUILDER);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function loadBuilders() {
    setLoading(true);

    const { data, error } = await supabase
      .from("builders")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      alert(`Could not load builders: ${error.message}`);
    } else {
      setBuilders(data ?? []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadBuilders();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function resetForm() {
    setBuilder({
      ...EMPTY_BUILDER,
      sort_order: builders.length,
    });

    setEditingId(null);
  }

  function editBuilder(item) {
    setBuilder({
      name: item.name ?? "",
      title: item.title ?? "",
      company: item.company ?? "",
      bio: item.bio ?? "",
      phone: item.phone ?? "",
      email: item.email ?? "",
      address: item.address ?? "",
      image_url: item.image_url ?? "",
      is_active: item.is_active ?? true,
      sort_order: item.sort_order ?? 0,
    });

    setEditingId(item.id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleImageUpload(file) {
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadMedia(supabase, file);

      setBuilder((prev) => ({
        ...prev,
        image_url: url,
      }));
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    }

    setUploading(false);
  }

  async function handleSave(e) {
    e.preventDefault();

    if (!builder.name.trim()) {
      alert("Builder name is required.");
      return;
    }

    setSaving(true);

    const payload = {
      name: builder.name.trim(),
      title: builder.title.trim() || null,
      company: builder.company.trim() || null,
      bio: builder.bio.trim() || null,
      phone: builder.phone.trim() || null,
      email: builder.email.trim() || null,
      address: builder.address.trim() || null,
      image_url: builder.image_url || null,
      is_active: builder.is_active,
      sort_order: Number(builder.sort_order) || 0,
    };

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from("builders")
        .update(payload)
        .eq("id", editingId));
    } else {
      ({ error } = await supabase
        .from("builders")
        .insert([payload]));
    }

    setSaving(false);

    if (error) {
      alert(`Could not save builder: ${error.message}`);
      return;
    }

    resetForm();
    await loadBuilders();
  }

  async function deleteBuilder(id) {
    const confirmed = confirm(
      "Are you sure you want to remove this builder?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("builders")
      .delete()
      .eq("id", id);

    if (error) {
      alert(`Could not delete builder: ${error.message}`);
      return;
    }

    await loadBuilders();

    if (editingId === id) {
      resetForm();
    }
  }

  async function toggleActive(item) {
    const { error } = await supabase
      .from("builders")
      .update({
        is_active: !item.is_active,
      })
      .eq("id", item.id);

    if (error) {
      alert(`Could not update builder: ${error.message}`);
      return;
    }

    await loadBuilders();
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="font-display text-2xl text-ink mb-1">
          Builders
        </h1>

        <p className="text-sm text-slate">
          Add and manage multiple builders or developers. Active builders
          appear in the Builder section on the public website.
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSave}
        className="bg-cloud border border-ink/10 rounded-sm p-8 mb-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl text-ink">
              {editingId ? "Edit Builder" : "Add Builder"}
            </h2>

            <p className="text-xs text-slate mt-1">
              {editingId
                ? "Update this builder's information."
                : "Create a new builder profile."}
            </p>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-slate hover:text-ink"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* NAME */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Builder Name *
            </label>

            <input
              value={builder.name}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  name: e.target.value,
                })
              }
              placeholder="Muhammad Ali"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* TITLE */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Position / Title
            </label>

            <input
              value={builder.title}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  title: e.target.value,
                })
              }
              placeholder="Managing Director"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* COMPANY */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Company
            </label>

            <input
              value={builder.company}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  company: e.target.value,
                })
              }
              placeholder="Babar & Brothers Builders & Developers"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Phone
            </label>

            <input
              value={builder.phone}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  phone: e.target.value,
                })
              }
              placeholder="0314-2188311"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Email
            </label>

            <input
              type="email"
              value={builder.email}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  email: e.target.value,
                })
              }
              placeholder="builder@example.com"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* SORT */}
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Display Order
            </label>

            <input
              type="number"
              value={builder.sort_order}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  sort_order: e.target.value,
                })
              }
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="block text-sm text-slate mb-1.5">
              Address
            </label>

            <input
              value={builder.address}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  address: e.target.value,
                })
              }
              placeholder="Office address"
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* BIO */}
          <div className="md:col-span-2">
            <label className="block text-sm text-slate mb-1.5">
              Builder Description / Bio
            </label>

            <textarea
              rows={5}
              value={builder.bio}
              onChange={(e) =>
                setBuilder({
                  ...builder,
                  bio: e.target.value,
                })
              }
              placeholder="Write information about this builder, experience, projects, vision, etc."
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 focus:outline-none focus:border-pine"
            />
          </div>

          {/* IMAGE */}
          <div className="md:col-span-2">
            <label className="block text-sm text-slate mb-1.5">
              Builder Photo
            </label>

            {builder.image_url && (
              <img
                src={builder.image_url}
                alt=""
                className="w-40 aspect-[4/5] object-cover rounded-sm mb-3"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                e.target.files?.[0] &&
                handleImageUpload(e.target.files[0])
              }
              className="text-sm"
            />

            {uploading && (
              <p className="text-xs text-slate mt-2">
                Uploading image…
              </p>
            )}
          </div>

          {/* ACTIVE */}
          <div className="md:col-span-2">
            <label className="inline-flex items-center gap-2 text-sm text-slate">
              <input
                type="checkbox"
                checked={builder.is_active}
                onChange={(e) =>
                  setBuilder({
                    ...builder,
                    is_active: e.target.checked,
                  })
                }
              />

              Show this builder on the website
            </label>
          </div>
        </div>

        <div className="mt-7 flex gap-3">
          <button
            type="submit"
            disabled={saving || uploading}
            className="inline-flex items-center rounded-sm bg-pine text-cloud px-6 py-3 text-sm hover:bg-pineLight disabled:opacity-50"
          >
            {saving
              ? "Saving…"
              : editingId
                ? "Update Builder"
                : "Add Builder"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-ink/15 px-6 py-3 rounded-sm text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* BUILDER LIST */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl text-ink">
            All Builders
          </h2>

          <span className="text-sm text-slate">
            {builders.length} builder
            {builders.length === 1 ? "" : "s"}
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-slate">
            Loading builders…
          </p>
        ) : builders.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-slate">
            No builders have been added yet.
          </div>
        ) : (
          <div className="space-y-3">
            {builders.map((item) => (
              <div
                key={item.id}
                className="bg-cloud border border-ink/10 rounded-sm p-4 flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="w-20 h-20 shrink-0 bg-stone rounded-sm overflow-hidden">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-slate">
                      No photo
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-lg text-ink">
                    {item.name}
                  </h3>

                  {item.title && (
                    <p className="text-sm text-slate">
                      {item.title}
                    </p>
                  )}

                  {item.company && (
                    <p className="text-xs text-brass mt-1">
                      {item.company}
                    </p>
                  )}

                  <div className="text-xs mt-2">
                    {item.is_active ? (
                      <span className="text-pine">
                        Active
                      </span>
                    ) : (
                      <span className="text-clay">
                        Hidden
                      </span>
                    )}

                    <span className="text-slate ml-3">
                      Order: {item.sort_order}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(item)}
                    className="border border-ink/15 rounded-sm px-3 py-2 text-xs"
                  >
                    {item.is_active ? "Hide" : "Show"}
                  </button>

                  <button
                    onClick={() => editBuilder(item)}
                    className="border border-pine/30 text-pine rounded-sm px-3 py-2 text-xs"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBuilder(item.id)}
                    className="border border-clay/30 text-clay rounded-sm px-3 py-2 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}