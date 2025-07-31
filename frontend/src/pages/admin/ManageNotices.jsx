"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Plus, Edit, Trash2, Calendar, AlertCircle } from "lucide-react"
import { noticesAPI } from "../../services/api"

const ManageNotices = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingNotice, setEditingNotice] = useState(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    isImportant: false,
    pdfFile: "",
  })

  const categories = [
    { value: "general", label: "General" },
    { value: "admission", label: "Admission" },
    { value: "academic", label: "Academic" },
    { value: "exam", label: "Examination" },
    { value: "event", label: "Event" },
  ]

  useEffect(() => {
    fetchNotices()
  }, [])

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingNotice) {
        const response = await noticesAPI.update(editingNotice._id, formData)
        if (response.success) {
          fetchNotices()
          resetForm()
        }
      } else {
        const response = await noticesAPI.create(formData)
        if (response.success) {
          fetchNotices()
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving notice:", error)
    }
  }

  const handleEdit = (notice) => {
    setEditingNotice(notice)
    setFormData({
      title: notice.title,
      description: notice.description,
      category: notice.category,
      isImportant: notice.isImportant,
      pdfFile: notice.pdfFile || "",
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this notice?")) {
      try {
        const response = await noticesAPI.delete(id)
        if (response.success) {
          fetchNotices()
        }
      } catch (error) {
        console.error("Error deleting notice:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "general",
      isImportant: false,
      pdfFile: "",
    })
    setEditingNotice(null)
    setShowModal(false)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
      academic: "bg-green-100 text-green-800",
      exam: "bg-red-100 text-red-800",
      event: "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800",
    }
    return colors[category] || colors.general
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Notices - Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Manage Notices</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Notice
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading notices...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notices.map((notice) => (
              <div key={notice._id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    {notice.isImportant && <AlertCircle className="h-5 w-5 text-red-500" />}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(notice.category)}`}>
                      {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(notice.publishDate)}
                    </div>
                    <button onClick={() => handleEdit(notice)} className="text-green-600 hover:text-green-800">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(notice._id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {notice.isImportant && <span className="text-red-500 mr-2">IMPORTANT:</span>}
                  {notice.title}
                </h3>
                <p className="text-gray-600 mb-3">{notice.description}</p>
                {notice.pdfFile && (
                  <a
                    href={notice.pdfFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View PDF Attachment
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">{editingNotice ? "Edit Notice" : "Add New Notice"}</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isImportant"
                      checked={formData.isImportant}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 block text-sm text-gray-900">Mark as Important</label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF File URL (Optional)</label>
                  <input
                    type="url"
                    name="pdfFile"
                    value={formData.pdfFile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
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
                    {editingNotice ? "Update" : "Add"} Notice
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

export default ManageNotices
