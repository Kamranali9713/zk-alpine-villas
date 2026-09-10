"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function InquiriesPage() {
  const supabase = createClient();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleDelete(id) {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Inquiries</h1>
      <p className="text-sm text-slate mb-8">Submissions from the website&apos;s booking / inquiry form.</p>

      {loading ? (
        <p className="text-slate text-sm">Loading…</p>
      ) : rows.length === 0 ? (
        <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-slate">
          No inquiries yet.
        </div>
      ) : (
        <div className="space-y-4">
          {rows.map((r) => (
            <div key={r.id} className="bg-cloud border border-ink/10 rounded-sm p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-ink font-medium">{r.full_name}</div>
                  <div className="text-sm text-slate">
                    {r.phone} {r.email ? `· ${r.email}` : ""} · {r.property_type}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-xs text-slate mb-2">
                    {new Date(r.created_at).toLocaleString()}
                  </div>
                  <button onClick={() => handleDelete(r.id)} className="text-sm text-clay hover:underline">
                    Delete
                  </button>
                </div>
              </div>
              {r.message && <p className="text-sm text-slate mt-3 leading-relaxed">{r.message}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
