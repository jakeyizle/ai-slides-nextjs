import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Home, Presentation } from "lucide-react"
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
        <div className="flex min-h-screen">
          <aside className="w-64 bg-secondary border-r border-secondary-foreground/10">
            <div className="p-4">
              <h1 className="text-lg font-semibold">AI Slides</h1>
            </div>
            <nav className="px-2 py-2">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary-foreground/10 text-secondary-foreground">
                    <Home className="h-4 w-4" />
                    <span>Home</span>
                  </Link>
                </li>
                <li>
                  <Link href="/presentation" className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-secondary-foreground/10 text-secondary-foreground">
                    <Presentation className="h-4 w-4" />
                    <span>Presentation</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <div className="flex flex-col flex-1">
            <main className="flex-grow">{children}</main>
            <footer className="bg-secondary text-secondary-foreground p-4 mt-auto">
              <div className="container mx-auto text-center">
                <p>&copy; 2025 AI Slideshow Creator. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </div>
      </body>
    </html>
  )
}
