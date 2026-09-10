import { Icon } from "./Icon";

export function MobileContactBar({ settings }) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink text-cloud flex">
      <a
        href={`tel:${settings.contact_phone_1}`}
        className="flex-1 flex items-center justify-center gap-2 py-4 border-r border-cloud/15 text-sm"
      >
        <Icon name="phone" className="w-4 h-4" /> Call Now
      </a>
      <a
        // href={`https://wa.me/${settings.whatsapp_number}`}
        href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, "")}?text=${encodeURIComponent(
          "Hello, I am interested in ZK Alpine Villas. Please provide me with more details about the available properties and payment plan.",
        )}`}
        target="_blank"
        className="flex-1 flex items-center justify-center gap-2 py-4 text-sm bg-[#128C4A]"
      >
        WhatsApp
      </a>
    </div>
  );
}
