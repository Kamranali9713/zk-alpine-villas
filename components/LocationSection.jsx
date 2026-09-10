import { Icon } from "./Icon";

export function LocationSection({ settings }) {
  const mapSrc =
    settings.map_embed_url ||
    "https://maps.google.com/maps?q=Nohisar%20Road%2C%20Quetta&t=&z=13&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-24 bg-stone">
      <div className="section-shell grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-brass text-sm tracking-wide mb-3">Location</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 leading-tight">
            Nohisar Road, Quetta, Balochistan
          </h2>
          <div className="flex items-start gap-3 text-slate mb-8">
            <Icon name="pin" className="w-5 h-5 text-brass mt-0.5 shrink-0" />
            <p className="leading-relaxed">
              Positioned on Nohisar Road with straightforward access to the rest of Quetta —
              close enough for daily commuting, quiet enough for a settled family life.
            </p>
          </div>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Nohisar+Road+Quetta"
            target="_blank"
            className="inline-flex rounded-sm border border-ink/20 px-6 py-3 text-sm text-ink hover:border-pine hover:text-pine transition-colors"
          >
            Get Directions
          </a>
        </div>
        <div className="aspect-[4/3] rounded-sm overflow-hidden border border-ink/10">
          <iframe src={mapSrc} className="w-full h-full" loading="lazy" title="ZK Alpine Villas location map" />
        </div>
      </div>
    </section>
  );
}
