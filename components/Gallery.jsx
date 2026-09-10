"use client";

import { useMemo, useState } from "react";

export function Gallery({ items }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section id="gallery" className="py-24 bg-stone">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div className="max-w-xl">
            <p className="text-brass text-sm tracking-wide mb-3">Project gallery</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink leading-tight">
              A closer look at the project
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
                  active === c
                    ? "bg-pine text-cloud border-pine"
                    : "border-ink/15 text-slate hover:border-pine"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-slate">
            Gallery images will appear here once added from the admin dashboard.
          </div>
        ) : (
          <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {filtered.map((img) => (
              <button
                key={img.id}
                onClick={() => setLightbox(img.image_url)}
                className="block w-full mb-4 break-inside-avoid"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.image_url}
                  alt={img.caption || img.category}
                  className="w-full rounded-sm hover:opacity-90 transition-opacity"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-ink/95 flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-sm" />
        </div>
      )}
    </section>
  );
}
