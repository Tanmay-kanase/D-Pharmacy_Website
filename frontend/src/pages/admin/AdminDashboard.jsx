"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Users, FileText, ImageIcon, Download, MessageSquare } from "lucide-react"

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    notices: 0,
    faculty: 0,
    gallery: 0,
    downloads: 0,
    contacts: 0,
  })

  useEffect(() => {
    // Mock data - replace with API calls
    setStats({
      notices: 15,
      faculty: 8,
      gallery: 45,
      downloads: 12,
      contacts: 23,
    })
  }, [])

  const statCards = [
    {
      name: "Total Notices",
      value: stats.notices,
      icon: FileText,
      color: "bg-blue-500",
      href: "/admin/notices",
    },
    {
      name: "Faculty Members",
      value: stats.faculty,
      icon: Users,
      color: "bg-green-500",
      href: "/admin/faculty",
    },
    {
      name: "Gallery Items",
      value: stats.gallery,
      icon: ImageIcon,
      color: "bg-purple-500",
      href: "/admin/gallery",
    },
    {
      name: "Downloads",
      value: stats.downloads,
      icon: Download,
      color: "bg-orange-500",
      href: "/admin/downloads",
    },
    {
      name: "Contact Queries",
      value: stats.contacts,
      icon: MessageSquare,
      color: "bg-red-500",
      href: "/admin/contacts",
    },
  ]

  return (
    <AdminLayout>
      <Helmet>
        <title>Admin Dashboard - D. Pharmacy College</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600">
            Welcome to the admin panel. Here's what's happening with your college website.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {statCards.map((card) => (
            <div key={card.name} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`${card.color} p-3 rounded-md`}>
                      <card.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{card.name}</dt>
                      <dd className="text-lg font-medium text-gray-900">{card.value}</dd>
                    </dl>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-5 py-3">
                <div className="text-sm">
                  <a href={card.href} className="font-medium text-blue-600 hover:text-blue-500">
                    View all
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Notices</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Admission Open for 2024-25</span>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Annual Sports Day</span>
                  <span className="text-xs text-gray-400">5 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pharmacy Week Events</span>
                  <span className="text-xs text-gray-400">1 week ago</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Contact Queries</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Admission inquiry from John Doe</span>
                  <span className="text-xs text-gray-400">1 day ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fee structure query</span>
                  <span className="text-xs text-gray-400">3 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Course details request</span>
                  <span className="text-xs text-gray-400">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/admin/notices"
                className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border border-blue-200 transition-colors"
              >
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <h4 className="font-medium text-blue-900">Add New Notice</h4>
                <p className="text-sm text-blue-700">Create and publish announcements</p>
              </a>
              <a
                href="/admin/faculty"
                className="bg-green-50 hover:bg-green-100 p-4 rounded-lg border border-green-200 transition-colors"
              >
                <Users className="h-8 w-8 text-green-600 mb-2" />
                <h4 className="font-medium text-green-900">Manage Faculty</h4>
                <p className="text-sm text-green-700">Add or update faculty information</p>
              </a>
              <a
                href="/admin/gallery"
                className="bg-purple-50 hover:bg-purple-100 p-4 rounded-lg border border-purple-200 transition-colors"
              >
                <ImageIcon className="h-8 w-8 text-purple-600 mb-2" />
                <h4 className="font-medium text-purple-900">Upload Media</h4>
                <p className="text-sm text-purple-700">Add photos and videos to gallery</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default AdminDashboard
