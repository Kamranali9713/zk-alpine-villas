import { Icon } from "./Icon";

const ITEMS = [
  { icon: "shield", title: "NOC Approved", desc: "Verified, legally cleared development." },
  { icon: "check", title: "Immediate Possession", desc: "Move in without long delays." },
  { icon: "sparkle", title: "Easy Installments", desc: "Low advance, manageable monthly plan." },
  { icon: "tree", title: "Modern Facilities", desc: "Utilities and amenities, built in." },
];

export function Highlights() {
  return (
    <section className="section-shell py-14 hairline">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-pine/10 text-pine">
              <Icon name={item.icon} className="w-5 h-5" />
            </div>
            <div className="font-display text-lg text-ink">{item.title}</div>
            <p className="text-sm text-slate leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
