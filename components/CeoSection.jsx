export function CeoSection({ settings }) {
  if (!settings.ceo_name) return null;

  return (
    <section className="py-24 bg-cloud">
      <div className="section-shell grid md:grid-cols-[280px_1fr] gap-12 items-center">
        <div className="w-48 md:w-full aspect-[4/5] rounded-sm overflow-hidden bg-stone mx-auto md:mx-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={settings.ceo_image_url || "/ceo-default.jpg"}
            alt={settings.ceo_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-brass text-sm tracking-wide mb-3">Leadership</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-2 leading-tight">
            {settings.ceo_name}
          </h2>
          {settings.ceo_title && (
            <p className="text-slate text-sm mb-6">{settings.ceo_title}</p>
          )}
          {settings.ceo_bio && (
            <p className="text-slate leading-relaxed max-w-xl">{settings.ceo_bio}</p>
          )}
        </div>
      </div>
    </section>
  );
}
