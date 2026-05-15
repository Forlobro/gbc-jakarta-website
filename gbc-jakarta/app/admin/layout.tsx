"use client"

import { usePathname } from "next/navigation"
import AdminSidebar from "./components/AdminSidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <main className="md:ml-64 min-h-screen pt-16 md:pt-0">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
