"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Plus, Trash2, ImageIcon, Video } from "lucide-react"
import { galleryAPI } from "../../services/api"

const ManageGallery = () => {
  const [gallery, setGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "image",
    url: "",
    category: "other",
  })

  const categories = [
    { value: "campus", label: "Campus" },
    { value: "events", label: "Events" },
    { value: "labs", label: "Laboratories" },
    { value: "students", label: "Students" },
    { value: "faculty", label: "Faculty" },
    { value: "other", label: "Other" },
  ]

  useEffect(() => {
    fetchGallery()
  }, [])

  const fetchGallery = async () => {
    try {
      const response = await galleryAPI.getAll()
      if (response.success) {
        setGallery(response.data)
      }
    } catch (error) {
      console.error("Error fetching gallery:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await galleryAPI.create(formData)
      if (response.success) {
        fetchGallery()
        resetForm()
      }
    } catch (error) {
      console.error("Error saving gallery item:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        const response = await galleryAPI.delete(id)
        if (response.success) {
          fetchGallery()
        }
      } catch (error) {
        console.error("Error deleting gallery item:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      type: "image",
      url: "",
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

  return (
    <AdminLayout>
      <Helmet>
        <title>Manage Gallery - Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Manage Gallery</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Media
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {gallery.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative">
                  {item.type === "image" ? (
                    <img
                      src={item.url || "/placeholder.svg?height=200&width=300"}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <Video className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h3>
                    <div className="flex items-center">
                      {item.type === "image" ? (
                        <ImageIcon className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Video className="h-4 w-4 text-purple-500" />
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 capitalize">{item.category}</p>
                  {item.description && <p className="text-xs text-gray-500 truncate">{item.description}</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">Add New Media</h3>
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
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
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
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Media URL *</label>
                  <input
                    type="url"
                    name="url"
                    required
                    value={formData.url}
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
                    Add Media
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

export default ManageGallery
