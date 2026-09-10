"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function DashboardOverview() {
  const supabase = createClient();
  const [counts, setCounts] = useState({ villas: 0, farmhouses: 0, gallery: 0, inquiries: 0 });

  useEffect(() => {
    async function load() {
      const [villas, farmhouses, gallery, inquiries] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }).eq("kind", "villa"),
        supabase.from("properties").select("id", { count: "exact", head: true }).eq("kind", "farmhouse"),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
      ]);
      setCounts({
        villas: villas.count ?? 0,
        farmhouses: farmhouses.count ?? 0,
        gallery: gallery.count ?? 0,
        inquiries: inquiries.count ?? 0,
      });
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards = [
    { label: "Villas", value: counts.villas, href: "/admin/dashboard/villas" },
    { label: "Farmhouses", value: counts.farmhouses, href: "/admin/dashboard/farmhouses" },
    { label: "Gallery images", value: counts.gallery, href: "/admin/dashboard/gallery" },
    { label: "Inquiries", value: counts.inquiries, href: "/admin/dashboard/inquiries" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl text-ink mb-1">Overview</h1>
      <p className="text-sm text-slate mb-8">Everything on the ZK Alpine Villas site, in one place.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className="bg-cloud border border-ink/10 rounded-sm p-6 hover:border-pine transition-colors">
            <div className="font-display text-3xl text-pine mb-1">{c.value}</div>
            <div className="text-sm text-slate">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
