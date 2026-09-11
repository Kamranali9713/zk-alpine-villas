"use client";

import { useState } from "react";

export function BuilderSection({ builders = [] }) {
  const activeBuilders = builders.filter(
    (builder) => builder.is_active !== false
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  if (activeBuilders.length === 0) {
    return null;
  }

  const currentBuilder = activeBuilders[currentIndex];

  function previousBuilder() {
    setCurrentIndex((index) =>
      index === 0
        ? activeBuilders.length - 1
        : index - 1
    );
  }

  function nextBuilder() {
    setCurrentIndex((index) =>
      index === activeBuilders.length - 1
        ? 0
        : index + 1
    );
  }

  return (
    <section
      id="builders"
      className="py-24 bg-cloud scroll-mt-24"
    >
      <div className="section-shell">
        {/* HEADER */}
        <div className="max-w-2xl mb-12">
          <p className="text-brass text-sm tracking-wide mb-3">
            Builders & Developers
          </p>

          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">
            The people behind the project
          </h2>

          <p className="text-slate leading-relaxed">
            Meet the builders and developers responsible for
            delivering quality projects and creating long-term
            value for our customers.
          </p>
        </div>

        {/* BUILDER CARD */}
        <div className="relative border border-ink/10 bg-stone rounded-sm overflow-hidden">
          <div className="grid md:grid-cols-[360px_1fr]">
            {/* IMAGE */}
            <div className="aspect-[4/5] md:aspect-auto md:min-h-[500px] bg-cloud">
              {currentBuilder.image_url ? (
                <img
                  src={currentBuilder.image_url}
                  alt={currentBuilder.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate text-sm">
                  No builder photo
                </div>
              )}
            </div>

            {/* INFORMATION */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <p className="text-brass text-sm tracking-wide mb-3">
                Builder / Developer
              </p>

              <h3 className="font-display text-3xl md:text-4xl text-ink mb-2">
                {currentBuilder.name}
              </h3>

              {currentBuilder.title && (
                <p className="text-slate mb-2">
                  {currentBuilder.title}
                </p>
              )}

              {currentBuilder.company && (
                <p className="text-pine text-sm mb-7">
                  {currentBuilder.company}
                </p>
              )}

              {currentBuilder.bio && (
                <p className="text-slate leading-relaxed max-w-2xl mb-8">
                  {currentBuilder.bio}
                </p>
              )}

              <div className="space-y-3 text-sm text-slate">
                {currentBuilder.phone && (
                  <div>
                    <span className="text-ink font-medium">
                      Phone:
                    </span>{" "}
                    {currentBuilder.phone}
                  </div>
                )}

                {currentBuilder.email && (
                  <div>
                    <span className="text-ink font-medium">
                      Email:
                    </span>{" "}
                    <a
                      href={`mailto:${currentBuilder.email}`}
                      className="hover:text-pine transition-colors"
                    >
                      {currentBuilder.email}
                    </a>
                  </div>
                )}

                {currentBuilder.address && (
                  <div>
                    <span className="text-ink font-medium">
                      Office:
                    </span>{" "}
                    {currentBuilder.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ARROWS */}
          {activeBuilders.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous builder"
                onClick={previousBuilder}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cloud/95 border border-ink/10 flex items-center justify-center text-ink hover:bg-pine hover:text-cloud transition-colors shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next builder"
                onClick={nextBuilder}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cloud/95 border border-ink/10 flex items-center justify-center text-ink hover:bg-pine hover:text-cloud transition-colors shadow-sm"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* DOTS */}
        {activeBuilders.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-6">
            {activeBuilders.map((builder, index) => (
              <button
                key={builder.id}
                type="button"
                aria-label={`Show ${builder.name}`}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-pine"
                    : "w-2 bg-ink/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}