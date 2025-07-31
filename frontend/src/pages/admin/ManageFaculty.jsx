"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Plus, Edit, Trash2, Mail, Phone } from "lucide-react"
import { facultyAPI } from "../../services/api"

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFaculty, setEditingFaculty] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    qualification: "",
    email: "",
    phone: "",
    image: "",
    experience: "",
    specialization: "",
  })

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const response = await facultyAPI.getAll()
      if (response.success) {
        setFaculty(response.data)
      }
    } catch (error) {
      console.error("Error fetching faculty:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingFaculty) {
        const response = await facultyAPI.update(editingFaculty._id, formData)
        if (response.success) {
          fetchFaculty()
          resetForm()
        }
      } else {
        const response = await facultyAPI.create(formData)
        if (response.success) {
          fetchFaculty()
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving faculty:", error)
    }
  }

  const handleEdit = (facultyMember) => {
    setEditingFaculty(facultyMember)
    setFormData({
      name: facultyMember.name,
      designation: facultyMember.designation,
      qualification: facultyMember.qualification,
      email: facultyMember.email,
      phone: facultyMember.phone,
      image: facultyMember.image || "",
      experience: facultyMember.experience || "",
      specialization: facultyMember.specialization || "",
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this faculty member?")) {
      try {
        const response = await facultyAPI.delete(id)
        if (response.success) {
          fetchFaculty()
        }
      } catch (error) {
        console.error("Error deleting faculty:", error)
      }
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      qualification: "",
      email: "",
      phone: "",
      image: "",
      experience: "",
      specialization: "",
    })
    setEditingFaculty(null)
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
        <title>Manage Faculty - Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Manage Faculty</h2>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading faculty members...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {faculty.map((member) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg?height=200&width=300"}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{member.designation}</p>
                  <p className="text-gray-600 text-sm mb-3">{member.qualification}</p>
                  <div className="space-y-1 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-3 w-3 mr-2" />
                      {member.email}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-3 w-3 mr-2" />
                      {member.phone}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center justify-center"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="flex-1 bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center justify-center"
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">
                  {editingFaculty ? "Edit Faculty Member" : "Add New Faculty Member"}
                </h3>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
                    <input
                      type="text"
                      name="designation"
                      required
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qualification *</label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
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
                    {editingFaculty ? "Update" : "Add"} Faculty
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

export default ManageFaculty
