import { Icon } from "./Icon";

export function NocSection({ settings }) {
  return (
    <section className="py-20 bg-cloud">
      <div className="section-shell">
        <div className="border border-ink/10 rounded-sm p-10 md:p-14 grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <p className="text-brass text-sm tracking-wide mb-3">Documentation</p>
            <h2 className="font-display text-2xl md:text-3xl text-ink mb-3 leading-tight">
              NOC approved, transparently documented
            </h2>
            <p className="text-slate leading-relaxed max-w-xl">
              All official approvals and project documents are supplied and confirmed by the
              developer before publishing. Copies are available to serious buyers on request.
            </p>
          </div>
          {settings.noc_document_url ? (
            <a
              href={settings.noc_document_url}
              target="_blank"
              className="shrink-0 inline-flex items-center gap-2 rounded-sm bg-ink text-cloud px-6 py-3 text-sm hover:bg-pine transition-colors"
            >
              <Icon name="shield" className="w-4 h-4" />
              View NOC Document
            </a>
          ) : (
            <a
              href="#contact"
              className="shrink-0 inline-flex items-center gap-2 rounded-sm border border-ink/20 text-ink px-6 py-3 text-sm hover:border-pine hover:text-pine transition-colors"
            >
              Request Documentation
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
