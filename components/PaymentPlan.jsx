export function PaymentPlan({ settings }) {
  return (
    <section id="payment-plan" className="py-24 bg-cloud">
      <div className="section-shell grid md:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-brass text-sm tracking-wide mb-3">Payment plan</p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 leading-tight">
            A simple structure, from advance to move-in
          </h2>
          <p className="text-slate leading-relaxed mb-8 max-w-md">
            Booking starts with a single advance payment, followed by a fixed monthly
            installment. The complete schedule and duration will be confirmed with you directly
            by our sales team.
          </p>
          <a href="#inquiry" className="inline-flex rounded-sm bg-pine text-cloud px-6 py-3 text-sm hover:bg-pineLight transition-colors">
            Start Your Booking
          </a>
        </div>

        <div className="border border-ink/10 rounded-sm overflow-hidden">
          <div className="p-8 border-b border-ink/10">
            <div className="text-sm text-slate mb-1">Advance Payment</div>
            <div className="font-display text-4xl text-pine">{settings.advance_payment}</div>
          </div>
          <div className="p-8">
            <div className="text-sm text-slate mb-1">Monthly Installment</div>
            <div className="font-display text-4xl text-pine">{settings.monthly_installment}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
