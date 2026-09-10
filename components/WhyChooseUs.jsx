import { Icon } from "./Icon";

const POINTS = [
  "Prime location on Nohisar Road",
  "Affordable initial payment",
  "Easy monthly installments",
  "Modern facilities",
  "Villa and farmhouse options",
  "Immediate possession",
  "Family-friendly environment",
];

export function WhyChooseUs() {
  return (
    <section className="py-24 bg-pine text-cloud">
      <div className="section-shell grid md:grid-cols-2 gap-14">
        <div>
          <p className="text-brassLight text-sm tracking-wide mb-3">Why choose us</p>
          <h2 className="font-display text-3xl md:text-4xl leading-tight">
            Why families are choosing ZK Alpine Villas
          </h2>
        </div>
        <ul className="space-y-4">
          {POINTS.map((p) => (
            <li key={p} className="flex items-start gap-3 pb-4 border-b border-cloud/15 last:border-0">
              <Icon name="check" className="w-5 h-5 text-brassLight mt-0.5 shrink-0" />
              <span className="text-cloud/90">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
