import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MaharThai",
  description: "Trusted workers for your home",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
