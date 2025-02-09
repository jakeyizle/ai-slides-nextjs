import Link from "next/link"
import { Home, Users, Settings, X } from "lucide-react"
import type React from "react" // Import React

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
        onClick={() => setSidebarOpen(false)}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 ease-out transform translate-x-0 bg-white border-r lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "ease-out translate-x-0" : "ease-in -translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between flex-shrink-0 p-4">
          <span className="text-xl font-semibold">My App</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1 transition-colors duration-200 rounded-md lg:hidden hover:text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 font-medium">
          <Link href="/" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Home className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link href="/presentation" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Users className="w-5 h-5 mr-3" />
            Presentation
          </Link>
          <Link href="/settings" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </div>
    </>
  )
}

export default Sidebar

