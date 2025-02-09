import type React from "react"
import { Menu } from "lucide-react"

interface HeaderProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <div className="flex items-center">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 focus:outline-none lg:hidden">
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <button className="flex items-center text-gray-500 hover:text-gray-600 focus:outline-none">
            <span className="mr-2">John Doe</span>
            <img className="w-8 h-8 rounded-full" src="https://via.placeholder.com/40" alt="User avatar" />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
