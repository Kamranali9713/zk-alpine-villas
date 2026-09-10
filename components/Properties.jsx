export function Properties({ id, kind, eyebrow, heading, intro, items, reverse = false }) {
  return (
    <section id={id} className={`py-24 ${reverse ? "bg-stone" : "bg-cloud"}`}>
      <div className="section-shell">
        <div className="max-w-2xl mb-12">
          <p className="text-brass text-sm tracking-wide mb-3">{eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-4 leading-tight">{heading}</h2>
          <p className="text-slate leading-relaxed">{intro}</p>
        </div>

        {items.length === 0 ? (
          <div className="border border-dashed border-ink/20 rounded-sm p-10 text-center text-slate">
            {kind === "villa" ? "Villa" : "Farmhouse"} listings will appear here once added from the
            admin dashboard.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((p) => (
              <div key={p.id} className="group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 bg-stone">
                  {p.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.image_url}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate text-sm">
                      No image yet
                    </div>
                  )}
                </div>
                <h3 className="font-display text-xl text-ink mb-1">{p.title}</h3>
                <div className="flex gap-4 text-sm text-slate mb-2">
                  {p.size && <span>{p.size}</span>}
                  {p.price && <span className="text-brass">{p.price}</span>}
                </div>
                {p.description && (
                  <p className="text-sm text-slate leading-relaxed mb-4">{p.description}</p>
                )}
                <a
                  href="#inquiry"
                  className="mt-auto text-sm text-pine border-b border-pine/40 self-start hover:border-pine transition-colors"
                >
                  {kind === "villa" ? "Book / Inquire About This Villa" : "Inquire About This Farmhouse"}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
