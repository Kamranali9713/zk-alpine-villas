


// import { Icon } from "./Icon";

// export function ContactSection({ settings }) {
//   return (
//     <section id="contact" className="py-24 bg-ink text-cloud">
//       <div className="section-shell grid md:grid-cols-2 gap-14">
//         <div>
//           <p className="text-brassLight text-sm tracking-wide mb-3">Contact</p>
//           <h2 className="font-display text-3xl md:text-4xl mb-6 leading-tight">
//             Speak with our sales team
//           </h2>
//           <p className="text-cloud/70 leading-relaxed max-w-md">
//             {settings.contact_person} and the ZK Alpine Villas team are available for site
//             visits, pricing details and booking assistance.
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div className="flex items-start gap-4">
//             <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
//             <div>
//               <div className="text-cloud/60 text-sm mb-1">Contact Person</div>
//               <div className="text-lg">{settings.contact_person}</div>
//             </div>
//           </div>
//           <div className="flex items-start gap-4">
//             <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
//             <div>
//               <div className="text-cloud/60 text-sm mb-1">Phone</div>
//               <div className="text-lg">{settings.contact_phone_1}</div>
//               {settings.contact_phone_2 && <div className="text-lg">{settings.contact_phone_2}</div>}
//             </div>
//           </div>
//           <div className="flex items-start gap-4">
//             <Icon name="pin" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
//             <div>
//               <div className="text-cloud/60 text-sm mb-1">Office</div>
//               <div className="text-lg">{settings.office_address}</div>
//             </div>
//           </div>
//           {settings.contact_email && (
//             <div className="flex items-start gap-4">
//               <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
//               <div>
//                 <div className="text-cloud/60 text-sm mb-1">Email</div>
//                 <div className="text-lg">{settings.contact_email}</div>
//               </div>
//             </div>
//           )}

//           <div className="flex flex-wrap gap-3 pt-2">
//             <a href={`tel:${settings.contact_phone_1}`} className="rounded-sm bg-brass text-ink px-6 py-3 text-sm hover:bg-brassLight transition-colors">
//               Call Now
//             </a>
//             <a
//               // href={`https://wa.me/${settings.whatsapp_number}`}
//               href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, "")}?text=${encodeURIComponent(
//                 "Hello, I am interested in ZK Alpine Villas. Please provide me with more details about the available properties and payment plan.",
//               )}`}
//               target="_blank"
//               className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors"
//             >
//               WhatsApp
//             </a>
//             {settings.contact_email && (
//               <a href={`mailto:${settings.contact_email}`} className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors">
//                 Email Us
//               </a>
//             )}
//             <a
//               href="https://www.google.com/maps/search/?api=1&query=Main+Spini+Road+Quetta"
//               target="_blank"
//               className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors"
//             >
//               Get Directions
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";

export function ContactSection({ settings, socialLinks = [] }) {

  console.log("socialLinks:", socialLinks)

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
          {settings.contact_email && (
            <div className="flex items-start gap-4">
              <Icon name="phone" className="w-5 h-5 text-brassLight mt-1 shrink-0" />
              <div>
                <div className="text-cloud/60 text-sm mb-1">Email</div>
                <div className="text-lg">{settings.contact_email}</div>
              </div>
            </div>
          )}

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
            {settings.contact_email && (
              <a href={`mailto:${settings.contact_email}`} className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors">
                Email Us
              </a>
            )}
            <a
              href="https://www.google.com/maps/search/?api=1&query=Main+Spini+Road+Quetta"
              target="_blank"
              className="rounded-sm border border-cloud/30 px-6 py-3 text-sm hover:bg-cloud/10 transition-colors"
            >
              Get Directions
            </a>
          </div>

          {socialLinks.length > 0 && (
            <div className="pt-6 border-t border-cloud/15">
              <div className="text-cloud/60 text-sm mb-3">Follow us</div>
              <SocialLinks items={socialLinks} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}