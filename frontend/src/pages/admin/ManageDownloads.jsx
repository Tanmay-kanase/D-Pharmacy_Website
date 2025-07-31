"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Plus, Trash2, FileText, Download } from "lucide-react"
import { downloadsAPI } from "../../services/api"

const ManageDownloads = () => {
  const [downloads, setDownloads] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    fileName: "",
    filePath: "",
    category: "other",
  })

  const categories = [
    { value: "admission", label: "Admission" },
    { value: "syllabus", label: "Syllabus" },
    { value: "brochure", label: "Brochure" },
    { value: "form", label: "Form" },
    { value: "other", label: "Other" },
  ]

  useEffect(() => {
    fetchDownloads()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await downloadsAPI.create(formData)
      if (response.success) {
        fetchDownloads()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving download:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this download?")) {
      try {
        const response = await downloadsAPI.delete(id)
        if (response.success) {
          fetchDownloads()
        }
      } catch (error) {
        console.error("Error deleting download:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      fileName: "",
      filePath: "",
      category: "other",
    })
    setShowModal(false)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
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

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Downloads - Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Manage Downloads</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Download
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading downloads...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloads.map((download) => (
              <div key={download._id} className="bg-white rounded-lg shadow-md p-6 border">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(download.category)}`}>
                    {download.category.charAt(0).toUpperCase() + download.category.slice(1)}
                  </span>
                  <button onClick={() => handleDelete(download._id)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-start mb-4">
                  <FileText className="h-8 w-8 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{download.title}</h3>
                    {download.description && <p className="text-gray-600 text-sm mb-2">{download.description}</p>}
                    <p className="text-gray-500 text-xs">
                      Added: {formatDate(download.createdAt)} • Downloads: {download.downloadCount || 0}
                    </p>
                  </div>
                </div>

                <a
                  href={download.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Add New Download</h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Name *</label>
                  <input
                    type="text"
                    name="fileName"
                    required
                    value={formData.fileName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File URL *</label>
                  <input
                    type="url"
                    name="filePath"
                    required
                    value={formData.filePath}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Add Download
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default ManageDownloads
