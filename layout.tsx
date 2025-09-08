import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { BackgroundAudioProvider } from "@/hooks/use-background-audio"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "MiTube - Stream with Background Playback",
  description: "Video streaming app with background audio playback",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>
          <BackgroundAudioProvider>{children}</BackgroundAudioProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
