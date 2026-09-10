const LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#villas", label: "Villas" },
  { href: "#farmhouses", label: "Farmhouses" },
  { href: "#facilities", label: "Facilities" },
  { href: "#payment-plan", label: "Payment Plan" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export function Footer({ settings }) {
  return (
    <footer className="bg-ink text-cloud/70 pt-16 pb-28 md:pb-10">
      <div className="section-shell grid md:grid-cols-3 gap-10 pb-10 hairline border-cloud/10">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Babar & Brothers Builders & Developers" className="h-14 w-auto mb-3 bg-cloud rounded-sm p-1.5" />
          <p className="text-sm">Your Dream Home &amp; Farmhouse in Quetta</p>
        </div>
        <div>
          <div className="text-cloud text-sm mb-3">Quick Links</div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-cloud transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-cloud text-sm mb-3">Contact</div>
          <p className="text-sm">{settings.contact_phone_1}</p>
          {settings.contact_phone_2 && <p className="text-sm">{settings.contact_phone_2}</p>}
          <p className="text-sm">{settings.office_address}</p>
        </div>
      </div>
      <div className="section-shell pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
        <p>© {new Date().getFullYear()} ZK Alpine Villas. All Rights Reserved.</p>
        <div className="flex gap-5">
          <a href="#" className="hover:text-cloud transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-cloud transition-colors">Terms &amp; Conditions</a>
          <a href="#" className="hover:text-cloud transition-colors">Disclaimer</a>
        </div>
      </div>
    </footer>
  );
}
