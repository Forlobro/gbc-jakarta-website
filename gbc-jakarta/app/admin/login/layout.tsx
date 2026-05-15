import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login - GBC Jakarta Admin",
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
