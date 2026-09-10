"use client";

import { useState } from "react";

export function FAQSection({ items }) {
  const [openId, setOpenId] = useState(items[0]?.id ?? null);

  return (
    <section className="py-24 bg-cloud">
      <div className="section-shell max-w-3xl">
        <p className="text-brass text-sm tracking-wide mb-3">Questions</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-10 leading-tight">
          Frequently asked questions
        </h2>

        <div>
          {items.map((f) => {
            const isOpen = openId === f.id;
            return (
              <div key={f.id} className="hairline">
                <button
                  onClick={() => setOpenId(isOpen ? null : f.id)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-display text-lg text-ink">{f.question}</span>
                  <span className={`text-brass text-xl leading-none transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-5 text-slate leading-relaxed pr-8">{f.answer}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
