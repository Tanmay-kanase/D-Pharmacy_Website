"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { Mail, Phone, Award } from "lucide-react"
import { facultyAPI } from "../services/api"

const FacultyPage = () => {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)

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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading faculty members...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>Faculty - D. Pharmacy College</title>
        <meta
          name="description"
          content="Meet our experienced and qualified faculty members dedicated to excellence in pharmaceutical education."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Faculty</h1>
            <p className="text-xl max-w-2xl">
              Meet our experienced and dedicated faculty members committed to excellence in pharmaceutical education
            </p>
          </div>
        </section>

        {/* Faculty Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {faculty.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No faculty members found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faculty.map((member) => (
                  <div
                    key={member._id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="aspect-w-3 aspect-h-4">
                      <img
                        src={member.image || "/placeholder.svg?height=300&width=250"}
                        alt={member.name}
                        className="w-full h-64 object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                      <p className="text-purple-600 font-semibold mb-2">{member.designation}</p>
                      <div className="flex items-start mb-3">
                        <Award className="h-4 w-4 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                        <p className="text-gray-600 text-sm">{member.qualification}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Mail className="h-4 w-4 text-gray-500 mr-2" />
                          <a href={`mailto:${member.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                            {member.email}
                          </a>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 text-gray-500 mr-2" />
                          <a href={`tel:${member.phone}`} className="text-sm text-gray-600">
                            {member.phone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default FacultyPage
