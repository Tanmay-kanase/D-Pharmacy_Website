"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import AdminLayout from "../../components/admin/AdminLayout"
import { Mail, Phone, Calendar, Eye, Trash2 } from "lucide-react"
import { contactAPI } from "../../services/api"

const ContactQueries = () => {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await contactAPI.getAll()
      if (response.success) {
        setContacts(response.data)
      }
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/${id}/read`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      })
      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error("Error marking as read:", error)
    }
  }

  const deleteContact = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact query?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        })
        if (response.ok) {
          fetchContacts()
          setSelectedContact(null)
        }
      } catch (error) {
        console.error("Error deleting contact:", error)
      }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getSubjectColor = (subject) => {
    const colors = {
      admission: "bg-blue-100 text-blue-800",
      courses: "bg-green-100 text-green-800",
      fees: "bg-purple-100 text-purple-800",
      facilities: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    }
    return colors[subject] || colors.other
  }

  return (
    <AdminLayout>
      <Helmet>
        <title>Contact Queries - Admin Panel</title>
      </Helmet>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Queries</h2>
          <p className="text-gray-600">Manage and respond to contact form submissions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading contact queries...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact List */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">All Queries ({contacts.length})</h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {contacts.map((contact) => (
                  <div
                    key={contact._id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      contact.isRead ? "bg-gray-50 border-gray-200" : "bg-white border-blue-200 shadow-sm"
                    } ${selectedContact?._id === contact._id ? "ring-2 ring-blue-500" : "hover:shadow-md"}`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-800">{contact.name}</h4>
                        {!contact.isRead && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(contact.subject)}`}
                      >
                        {contact.subject}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{contact.message}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(contact.createdAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-md">
              {selectedContact ? (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Query Details</h3>
                    <div className="flex space-x-2">
                      {!selectedContact.isRead && (
                        <button
                          onClick={() => markAsRead(selectedContact._id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Mark as read"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteContact(selectedContact._id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{selectedContact.name}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-400 mr-2" />
                          <a href={`mailto:${selectedContact.email}`} className="text-blue-600 hover:text-blue-800">
                            {selectedContact.email}
                          </a>
                        </div>
                      </div>
                      {selectedContact.phone && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Phone</label>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 text-gray-400 mr-2" />
                            <a href={`tel:${selectedContact.phone}`} className="text-blue-600 hover:text-blue-800">
                              {selectedContact.phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Subject</label>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(selectedContact.subject)}`}
                      >
                        {selectedContact.subject.charAt(0).toUpperCase() + selectedContact.subject.slice(1)}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Message</label>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-900 whitespace-pre-wrap">{selectedContact.message}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Submitted On</label>
                      <p className="text-gray-600">{formatDate(selectedContact.createdAt)}</p>
                    </div>

                    <div className="pt-4 border-t">
                      <a
                        href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}&body=Dear ${selectedContact.name},%0D%0A%0D%0AThank you for contacting D. Pharmacy College.%0D%0A%0D%0A`}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Reply via Email
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a query to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default ContactQueries
