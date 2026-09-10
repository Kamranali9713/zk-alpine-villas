"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function InquiryForm({ settings }) {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    property_type: "Villa",
    message: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.from("inquiries").insert([form]);
    if (error) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setForm({
      full_name: "",
      phone: "",
      email: "",
      property_type: "Villa",
      message: "",
    });
  }

  return (
    <section id="inquiry" className="py-24 bg-stone">
      <div className="section-shell grid md:grid-cols-2 gap-14">
        <div>
          <p className="text-brass text-sm tracking-wide mb-3">
            Book / Inquire
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-ink mb-6 leading-tight">
            Tell us what you&apos;re looking for
          </h2>
          <p className="text-slate leading-relaxed mb-8 max-w-md">
            Share a few details and our sales team will get back to you with
            availability and pricing, or reach out directly.
          </p>
          <div className="flex flex-col gap-3">
            <a
              // href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
              //   "Hello, I am interested in ZK Alpine Villas. Please provide me with more details about the available properties and payment plan."
              // )}`}
              href={`https://wa.me/${String(settings.whatsapp_number).replace(/\D/g, "")}?text=${encodeURIComponent(
                "Hello, I am interested in ZK Alpine Villas. Please provide me with more details about the available properties and payment plan.",
              )}`}
              target="_blank"
              className="inline-flex w-fit rounded-sm bg-pine text-cloud px-6 py-3 text-sm hover:bg-pineLight transition-colors"
            >
              Message on WhatsApp
            </a>
            <a
              href={`tel:${settings.contact_phone_1}`}
              className="inline-flex w-fit rounded-sm border border-ink/20 px-6 py-3 text-sm text-ink hover:border-pine hover:text-pine transition-colors"
            >
              Call {settings.contact_phone_1}
            </a>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-cloud border border-ink/10 rounded-sm p-8 space-y-4"
        >
          <div>
            <label className="block text-sm text-slate mb-1.5">Full Name</label>
            <input
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 bg-cloud focus:outline-none focus:border-pine"
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Phone Number
            </label>
            <input
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 bg-cloud focus:outline-none focus:border-pine"
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 bg-cloud focus:outline-none focus:border-pine"
            />
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">
              Property Type
            </label>
            <select
              value={form.property_type}
              onChange={(e) =>
                setForm({ ...form, property_type: e.target.value })
              }
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 bg-cloud focus:outline-none focus:border-pine"
            >
              <option>Villa</option>
              <option>Farmhouse</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate mb-1.5">Message</label>
            <textarea
              rows={3}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full border border-ink/15 rounded-sm px-4 py-2.5 bg-cloud focus:outline-none focus:border-pine"
            />
          </div>

          <button
            disabled={status === "loading"}
            className="w-full rounded-sm bg-pine text-cloud py-3 text-sm hover:bg-pineLight transition-colors disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Submit Inquiry"}
          </button>

          {status === "done" && (
            <p className="text-sm text-pine">
              Thanks — we received your inquiry and will contact you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-clay">
              Something went wrong. Please try WhatsApp or call instead.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
