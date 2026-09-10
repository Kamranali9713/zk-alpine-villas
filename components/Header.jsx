"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#villas", label: "Villas" },
  { href: "#farmhouses", label: "Farmhouses" },
  { href: "#facilities", label: "Facilities" },
  { href: "#payment-plan", label: "Payment Plan" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cloud/90 backdrop-blur border-b border-ink/10">
      <div className="section-shell flex items-center justify-between h-20">
        <a href="#top" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Babar & Brothers Builders & Developers" className="h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-sm text-ink/80">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-pine transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#inquiry"
            className="inline-flex items-center rounded-sm bg-pine text-cloud px-5 py-2.5 text-sm hover:bg-pineLight transition-colors"
          >
            Book Now
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden text-ink"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18" /></svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          )}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-cloud border-t border-ink/10">
          <nav className="section-shell flex flex-col py-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-ink/80 border-b border-ink/5 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#inquiry"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-sm bg-pine text-cloud px-5 py-3 text-sm"
            >
              Book Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
