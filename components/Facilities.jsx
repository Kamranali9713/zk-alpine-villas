import { Icon } from "./Icon";

export function Facilities({ items }) {
  return (
    <section id="facilities" className="py-24 bg-ink text-cloud">
      <div className="section-shell">
        <div className="max-w-2xl mb-12">
          <p className="text-brassLight text-sm tracking-wide mb-3">On-site facilities</p>
          <h2 className="font-display text-3xl md:text-4xl mb-4 leading-tight">
            Everything a household needs, already in place
          </h2>
          <p className="text-cloud/70 leading-relaxed">
            ZK Alpine Villas is planned with core utilities and community amenities from the
            outset — not promised for later.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-cloud/10">
          {items.map((f) => (
            <div key={f.id} className="bg-ink p-8 hover:bg-pine/40 transition-colors">
              <Icon name={f.icon || "sparkle"} className="w-7 h-7 text-brassLight mb-4" />
              <div className="font-display text-lg mb-2">{f.name}</div>
              {f.description && (
                <p className="text-sm text-cloud/60 leading-relaxed">{f.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
