"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { Calendar, FileText, Download, Filter, AlertCircle } from "lucide-react"
import { noticesAPI } from "../services/api"

const NoticesPage = () => {
  const [notices, setNotices] = useState([])
  const [filteredNotices, setFilteredNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { key: "all", label: "All Notices" },
    { key: "admission", label: "Admission" },
    { key: "academic", label: "Academic" },
    { key: "exam", label: "Examination" },
    { key: "event", label: "Events" },
    { key: "general", label: "General" },
  ]

  useEffect(() => {
    fetchNotices()
  }, [])

  useEffect(() => {
    filterNotices()
  }, [notices, activeFilter])

  const fetchNotices = async () => {
    try {
      const response = await noticesAPI.getAll()
      if (response.success) {
        setNotices(response.data)
      }
    } catch (error) {
      console.error("Error fetching notices:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterNotices = () => {
    if (activeFilter === "all") {
      setFilteredNotices(notices)
    } else {
      setFilteredNotices(notices.filter((notice) => notice.category === activeFilter))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getCategoryColor = (category) => {
    const colors = {
      admission: "bg-blue-100 text-blue-800",
      academic: "bg-green-100 text-green-800",
      exam: "bg-red-100 text-red-800",
      event: "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800",
    }
    return colors[category] || colors.general
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
            <p className="mt-4 text-gray-600">Loading notices...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>Notices & Announcements - D. Pharmacy College</title>
        <meta
          name="description"
          content="Stay updated with latest notices, announcements, and important information from D. Pharmacy College."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-red-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Notices & Announcements</h1>
            <p className="text-xl max-w-2xl">
              Stay informed with the latest updates, announcements, and important information
            </p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-600 font-medium mr-4">Filter by category:</span>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter.key ? "bg-red-600 text-white" : "bg-white text-gray-700 hover:bg-red-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Notices List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredNotices.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No notices found for the selected category.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredNotices.map((notice) => (
                  <div
                    key={notice._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-red-500"
                  >
                    <div className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                          {notice.isImportant && <AlertCircle className="h-5 w-5 text-red-500" />}
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}
                          >
                            {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(notice.publishDate)}
                        </div>
                      </div>

                      <h2 className="text-xl font-bold text-gray-800 mb-3">
                        {notice.isImportant && <span className="text-red-500 mr-2">IMPORTANT:</span>}
                        {notice.title}
                      </h2>

                      <p className="text-gray-600 mb-4 leading-relaxed">{notice.description}</p>

                      {notice.pdfFile && (
                        <div className="flex items-center">
                          <a
                            href={notice.pdfFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-red-600 hover:text-red-800 font-medium"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download PDF
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Important Notice Banner */}
        <section className="py-8 bg-yellow-50 border-t border-yellow-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center text-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 mr-2" />
              <p className="text-yellow-800">
                <strong>Stay Updated:</strong> Subscribe to our notifications to receive important announcements
                directly.
              </p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default NoticesPage
