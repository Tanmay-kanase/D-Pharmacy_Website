"use client"

import { useState, useEffect } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  FileText,
  ImageIcon,
  Download,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
} from "lucide-react"
import { useAuth } from "../../context/AuthContext"

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      navigate("/admin/login")
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    navigate("/admin/login")
  }

  const menuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Faculty", href: "/admin/faculty", icon: Users },
    { name: "Manage Notices", href: "/admin/notices", icon: FileText },
    { name: "Manage Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Manage Downloads", href: "/admin/downloads", icon: Download },
    { name: "Contact Queries", href: "/admin/contacts", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  const isActive = (path) => location.pathname === path

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white text-lg font-semibold">Admin Panel</span>
        </div>
        <nav className="mt-5 px-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md mb-1 transition-colors ${
                isActive(item.href) ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="mr-4 h-6 w-6" />
              {item.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white mb-1"
          >
            <LogOut className="mr-4 h-6 w-6" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm lg:static lg:overflow-y-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
              <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    type="button"
                    className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
                </div>
              </div>
              <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                  <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
                </div>
              </div>
              <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden xl:col-span-4">
                <span className="text-sm text-gray-700 mr-4">Welcome, {user.username}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
          </div>
        </main>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)}></div>
        </div>
      )}
    </div>
  )
}

export default AdminLayout
