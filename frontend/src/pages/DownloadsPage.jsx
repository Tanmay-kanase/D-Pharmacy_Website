"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { Download, FileText, Filter, Calendar } from "lucide-react"
import { downloadsAPI } from "../services/api"

const DownloadsPage = () => {
  const [downloads, setDownloads] = useState([])
  const [filteredDownloads, setFilteredDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { key: "all", label: "All Downloads" },
    { key: "admission", label: "Admission Forms" },
    { key: "syllabus", label: "Syllabus" },
    { key: "brochure", label: "Brochures" },
    { key: "form", label: "Forms" },
    { key: "other", label: "Others" },
  ]

  useEffect(() => {
    fetchDownloads()
  }, [])

  useEffect(() => {
    filterDownloads()
  }, [downloads, activeFilter])

  const fetchDownloads = async () => {
    try {
      const response = await downloadsAPI.getAll()
      if (response.success) {
        setDownloads(response.data)
      }
    } catch (error) {
      console.error("Error fetching downloads:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterDownloads = () => {
    if (activeFilter === "all") {
      setFilteredDownloads(downloads)
    } else {
      setFilteredDownloads(downloads.filter((download) => download.category === activeFilter))
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getCategoryColor = (category) => {
    const colors = {
      admission: "bg-blue-100 text-blue-800",
      syllabus: "bg-green-100 text-green-800",
      brochure: "bg-purple-100 text-purple-800",
      form: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[category] || colors.other
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading downloads...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>Downloads - D. Pharmacy College</title>
        <meta
          name="description"
          content="Download admission forms, syllabus, brochures, and other important documents from D. Pharmacy College."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Downloads</h1>
            <p className="text-xl max-w-2xl">
              Access important documents, forms, and resources for your academic journey
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
                      activeFilter === filter.key
                        ? "bg-green-600 text-white"
                        : "bg-white text-gray-700 hover:bg-green-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Downloads List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredDownloads.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No downloads found for the selected category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDownloads.map((download) => (
                  <div
                    key={download._id}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(download.category)}`}
                        >
                          {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                        </span>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(download.createdAt)}
                        </div>
                      </div>

                      <div className="flex items-start mb-4">
                        <FileText className="h-8 w-8 text-green-600 mr-3 flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2">{download.title}</h3>
                          {download.description && <p className="text-gray-600 text-sm mb-2">{download.description}</p>}
                          <p className="text-gray-500 text-xs">
                            Size: {formatFileSize(download.fileSize)} • Downloads: {download.downloadCount}
                          </p>
                        </div>
                      </div>

                      <a
                        href={download.filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              If you're having trouble downloading any document or need additional information, please contact us
            </p>
            <a
              href="/contact"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Contact Support
            </a>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default DownloadsPage
