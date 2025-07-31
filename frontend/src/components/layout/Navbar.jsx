"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, GraduationCap } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Courses", href: "/courses" },
    { name: "Faculty", href: "/faculty" },
    { name: "Admission", href: "/admission" },
    { name: "Fees", href: "/fees" },
    { name: "Facilities", href: "/facilities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Notices", href: "/notices" },
    { name: "Downloads", href: "/downloads" },
    { name: "Contact", href: "/contact" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-gray-800">D. Pharmacy College</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href) ? "text-blue-600 bg-blue-50" : "text-gray-700 hover:text-blue-600"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
