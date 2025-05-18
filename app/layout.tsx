import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { NotificationHandler } from "@/components/notification-handler"
import "./globals.css"

export const metadata: Metadata = {
  title: "Q-Drive",
  description: "Safe & Reliable Transportation",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <NotificationHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
