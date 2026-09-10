// "use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";

// const NAV = [
//   { href: "/admin/dashboard", label: "Overview" },
//   { href: "/admin/dashboard/villas", label: "Villas" },
//   { href: "/admin/dashboard/farmhouses", label: "Farmhouses" },
//   { href: "/admin/dashboard/facilities", label: "Facilities" },
//   { href: "/admin/dashboard/gallery", label: "Gallery" },
//   { href: "/admin/dashboard/faqs", label: "FAQs" },
//   { href: "/admin/dashboard/inquiries", label: "Inquiries" },
//   { href: "/admin/dashboard/settings", label: "Site Settings" },
// ];

// export default function DashboardLayout({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   async function signOut() {
//     const supabase = createClient();
//     await supabase.auth.signOut();
//     router.push("/admin/login");
//     router.refresh();
//   }

//   return (
//     <div className="min-h-screen flex bg-stone">
//       <aside className="w-64 shrink-0 bg-ink text-cloud/80 flex flex-col">
//         <div className="p-6 border-b border-cloud/10">
//           {/* eslint-disable-next-line @next/next/no-img-element */}
//           <img src="/logo.png" alt="Babar & Brothers Builders & Developers" className="h-10 w-auto mb-2 bg-cloud rounded-sm p-1" />
//           <div className="text-xs text-cloud/50">Admin dashboard</div>
//         </div>
//         <nav className="flex-1 py-4">
//           {NAV.map((item) => {
//             const active = pathname === item.href;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`block px-6 py-3 text-sm transition-colors ${
//                   active ? "bg-pine text-cloud" : "hover:bg-cloud/5"
//                 }`}
//               >
//                 {item.label}
//               </Link>
//             );
//           })}
//         </nav>
//         <div className="p-6 border-t border-cloud/10">
//           <a href="/" target="_blank" className="block text-xs text-cloud/50 hover:text-cloud mb-3">
//             View live site ↗
//           </a>
//           <button onClick={signOut} className="text-sm text-cloud/70 hover:text-cloud">
//             Sign out
//           </button>
//         </div>
//       </aside>
//       <main className="flex-1 p-8 md:p-10 overflow-x-hidden">{children}</main>
//     </div>
//   );
// }


"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin/dashboard", label: "Overview" },
  { href: "/admin/dashboard/villas", label: "Villas" },
  { href: "/admin/dashboard/farmhouses", label: "Farmhouses" },
  { href: "/admin/dashboard/facilities", label: "Facilities" },
  { href: "/admin/dashboard/gallery", label: "Gallery" },
  { href: "/admin/dashboard/faqs", label: "FAQs" },
  { href: "/admin/dashboard/inquiries", label: "Inquiries" },
  { href: "/admin/dashboard/settings", label: "Site Settings" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex bg-stone">
      <aside className="w-64 shrink-0 bg-ink text-cloud/80 flex flex-col">
        <div className="p-6 border-b border-cloud/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Babar & Brothers Builders & Developers" className="h-10 w-auto mb-2 bg-cloud rounded-sm p-1" />
          <div className="text-xs text-cloud/50">Admin dashboard</div>
        </div>
        <nav className="flex-1 py-4">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-6 py-3 text-sm transition-colors ${
                  active ? "bg-pine text-cloud" : "hover:bg-cloud/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-cloud/10">
          <a href="/" target="_blank" className="block text-xs text-cloud/50 hover:text-cloud mb-3">
            View live site ↗
          </a>
          <button onClick={signOut} className="text-sm text-cloud/70 hover:text-cloud">
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}