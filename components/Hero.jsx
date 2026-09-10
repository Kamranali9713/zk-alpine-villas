import { getEmbedUrl } from "@/lib/video";

export function Hero({ settings }) {
  const hasVideo = !!settings.hero_video_url;
  const video = hasVideo ? getEmbedUrl(settings.hero_video_url) : null;

  return (
    <section id="top" className="relative min-h-[92vh] flex items-end overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {video?.type === "file" ? (
          <video
            className="w-full h-full object-cover opacity-70"
            src={video.src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : video ? (
          <iframe
            className="w-full h-full object-cover opacity-70 scale-150"
            src={`${video.src}&autoplay=1&mute=1&loop=1&controls=0&playsinline=1`}
            allow="autoplay; encrypted-media"
            title="ZK Alpine Villas hero video"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.hero_image_url || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1800&auto=format&fit=crop"}
            alt="ZK Alpine Villas"
            className="w-full h-full object-cover opacity-70"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/20" />
      </div>

      <div className="relative section-shell w-full pb-20 pt-40">
        <div className="max-w-2xl">
          <p className="text-brassLight text-sm tracking-wide mb-4">Nohisar Road, Quetta</p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.05] text-cloud mb-6">
            {settings.hero_heading}
          </h1>
          <p className="text-cloud/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            {settings.hero_subheading}
          </p>

          <div className="flex flex-wrap gap-x-8 gap-y-3 mb-9 text-cloud">
            <div>
              <div className="font-display text-2xl text-brassLight">{settings.advance_payment}</div>
              <div className="text-xs text-cloud/60">Advance</div>
            </div>
            <div>
              <div className="font-display text-2xl text-brassLight">{settings.monthly_installment}</div>
              <div className="text-xs text-cloud/60">Monthly Installment</div>
            </div>
            <div>
              <div className="font-display text-2xl text-brassLight">Immediate</div>
              <div className="text-xs text-cloud/60">Possession</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href="#inquiry" className="rounded-sm bg-brass px-6 py-3 text-sm text-ink hover:bg-brassLight transition-colors">
              Book Your Property
            </a>
            <a
              // href={`https://wa.me/${settings.whatsapp_number}`}
              href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, "")}?text=${encodeURIComponent("Hello, I am interested in ZK Alpine Villas. Please provide me with more details.")}`}
              target="_blank"
              className="rounded-sm border border-cloud/40 px-6 py-3 text-sm text-cloud hover:bg-cloud/10 transition-colors"
            >
              WhatsApp Us
            </a>
            <a href={`tel:${settings.contact_phone_1}`} className="rounded-sm border border-cloud/40 px-6 py-3 text-sm text-cloud hover:bg-cloud/10 transition-colors">
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
