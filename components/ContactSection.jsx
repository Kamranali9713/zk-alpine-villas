import { Icon } from "./Icon";

export function ContactSection({ settings }) {
  return (
    <section id="contact" className="py-24 bg-ink text-cloud">
      <div className="section-shell grid md:grid-cols-2 gap-14">
        <div>
          <p className="text-brassLight text-sm tracking-wide mb-3">Contact</p>
          <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight">
            Speak with our sales team
          </h2>
          <p className="text-cloud/70 leading-relaxed max-w-md">
            {settings.contact_person} and the ZK Alpine Villas team are available for site
            visits, pricing details and booking assistance.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
            <div>
              <div className="text-cloud/60 text-sm mb-1">Contact Person</div>
              <div className="text-lg">{settings.contact_person}</div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
            <div>
              <div className="text-cloud/60 text-sm mb-1">Phone</div>
              <div className="text-lg">{settings.contact_phone_1}</div>
              {settings.contact_phone_2 && <div className="text-lg">{settings.contact_phone_2}</div>}
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Icon name="pin" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
            <div>
              <div className="text-cloud/60 text-sm mb-1">Office</div>
              <div className="text-lg">{settings.office_address}</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a href={`tel:${settings.contact_phone_1}`} className="rounded-sm bg-brass text-ink px-6 py-3 text-sm hover:bg-brassLight transition-colors">
              Call Now
            </a>
            <a
              href={`https://wa.me/${settings.whatsapp_number}`}
              target="_blank"
              className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Main+Spini+Road+Quetta"
              target="_blank"
              className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
