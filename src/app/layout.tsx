"use client"
import "./globals.css";
import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Header from "./components/Header"
import type React from "react" // Added import for React

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
