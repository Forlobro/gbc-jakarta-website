"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fas fa-th-large" },
  {
    href: "/admin/companies",
    label: "Companies",
    icon: "fas fa-building",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0f172a] border-r border-slate-800 flex flex-col z-50">
      {/* Brand */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#00c2cb] to-[#00a8b0] rounded-xl flex items-center justify-center shadow-lg shadow-[#00c2cb]/10">
            <i className="fas fa-cog text-white text-sm" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">GBC Jakarta</h2>
            <p className="text-slate-500 text-xs">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-[#00c2cb] text-white shadow-sm shadow-[#00c2cb]/30"
                  : "bg-[#00c2cb]/70 text-white hover:bg-[#00c2cb]"
              }`}
            >
              <i className={`${item.icon} w-5 text-center`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-300 text-sm transition-colors rounded-xl hover:bg-slate-800/50 mb-1"
        >
          <i className="fas fa-external-link-alt w-5 text-center" />
          View Site
        </Link>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-red-400 hover:text-red-300 text-sm transition-colors rounded-xl hover:bg-red-500/10 cursor-pointer"
        >
          <i className="fas fa-sign-out-alt w-5 text-center" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
