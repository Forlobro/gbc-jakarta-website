"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "../../lib/supabase";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "fas fa-th-large" },
  {
    href: "/admin/companies",
    label: "Companies",
    icon: "far fa-building",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#00c2cb] to-[#00a8b0] rounded-lg flex items-center justify-center shadow-sm shadow-[#00c2cb]/10">
            <i className="fas fa-cog text-white text-xs" />
          </div>
          <h2 className="text-slate-900 font-bold text-sm">GBC Jakarta</h2>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <i className={`fas ${isOpen ? "fa-times" : "fa-bars"} text-lg`} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-slate-200 hidden md:block">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#00c2cb] to-[#00a8b0] rounded-xl flex items-center justify-center shadow-lg shadow-[#00c2cb]/10">
              <i className="fas fa-cog text-white text-sm" />
            </div>
            <div>
              <h2 className="text-slate-900 font-bold text-sm">GBC Jakarta</h2>
              <p className="text-slate-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#00c2cb] text-white shadow-sm shadow-[#00c2cb]/30"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <i className={`${item.icon} w-5 text-center`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-slate-900 text-sm transition-colors rounded-xl hover:bg-slate-50 mb-1"
          >
            <i className="fas fa-external-link-alt w-5 text-center" />
            View Site
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:text-red-700 text-sm transition-colors rounded-xl hover:bg-red-50 cursor-pointer"
          >
            <i className="fas fa-sign-out-alt w-5 text-center" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
