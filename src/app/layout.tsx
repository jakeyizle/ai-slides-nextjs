import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

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
          <header className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">AI Slideshow Creator</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/presentation" className="hover:underline">
                      Presentation
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <footer className="bg-secondary text-secondary-foreground p-4">
            <div className="container mx-auto text-center">
              <p>&copy; 2025 AI Slideshow Creator. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}

