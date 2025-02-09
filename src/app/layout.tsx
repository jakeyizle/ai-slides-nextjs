import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Slideshow Creator",
  description: "Create slideshows using AI prompts",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">{children}</main>
          <footer className="bg-secondary text-secondary-foreground p-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 AI Slideshow Creator. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
