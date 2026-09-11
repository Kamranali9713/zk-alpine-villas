export function About() {
  return (
    <section id="about" className="py-24 bg-stone">
      <div className="section-shell grid md:grid-cols-2 gap-14 items-center">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400&auto=format&fit=crop"
            alt="ZK Alpine Villas project"
            className="w-full aspect-[4/5] object-cover rounded-sm"
          />
        </div>
        <div>
          <p className="text-brass text-sm tracking-wide mb-3">
            About the project
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 leading-tight">
            A residential community on Nohisar Road, built for how families
            actually live
          </h2>
          <div className="space-y-4 text-slate leading-relaxed">
            <p>
              ZK Alpine Villas sits on Nohisar Road in Quetta, offering both
              villa and farmhouse plots within a single community. The project
              is planned around everyday needs — reliable utilities, security,
              and green open spaces — rather than just the sale of land.
            </p>
            <p>
              Whether you&apos;re looking for a permanent family home or a
              farmhouse retreat close to the city, ZK Alpine Villas is designed
              to give you both a place to live and a long-term investment, with
              a payment plan built to be accessible from day one.
            </p>
          </div>
          <div className="mt-8 flex gap-10">
            <div>
              <div className="font-display text-3xl text-pine">2</div>
              <div className="text-sm text-slate">Property types</div>
            </div>
            <div>
              <div className="font-display text-3xl text-pine">8+</div>
              <div className="text-sm text-slate">Core facilities</div>
            </div>
            <div>
              <div className="font-display text-3xl text-pine">In Process</div>
              <div className="text-sm text-slate">
                NOC under process with QDA
              </div>

              {/* <div className="font-display text-3xl text-pine">100%</div>
              <div className="text-sm text-slate">NOC approved</div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
