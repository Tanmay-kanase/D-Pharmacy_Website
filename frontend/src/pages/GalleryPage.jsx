"use client"

import { useState, useEffect } from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { ImageIcon, Video, Filter } from "lucide-react"
import { galleryAPI } from "../services/api"

const GalleryPage = () => {
  const [gallery, setGallery] = useState([])
  const [filteredGallery, setFilteredGallery] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedItem, setSelectedItem] = useState(null)

  const filters = [
    { key: "all", label: "All" },
    { key: "campus", label: "Campus" },
    { key: "events", label: "Events" },
    { key: "labs", label: "Laboratories" },
    { key: "students", label: "Students" },
    { key: "faculty", label: "Faculty" },
  ]

  useEffect(() => {
    fetchGallery()
  }, [])

  useEffect(() => {
    filterGallery()
  }, [gallery, activeFilter])

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

  const filterGallery = () => {
    if (activeFilter === "all") {
      setFilteredGallery(gallery)
    } else {
      setFilteredGallery(gallery.filter((item) => item.category === activeFilter))
    }
  }

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading gallery...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <Helmet>
        <title>Gallery - D. Pharmacy College</title>
        <meta
          name="description"
          content="Explore our photo and video gallery showcasing campus life, events, facilities, and student activities."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-pink-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
            <p className="text-xl max-w-2xl">Discover campus life through our collection of photos and videos</p>
          </div>
        </section>

        {/* Filter Buttons */}
        <section className="py-8 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-gray-600 font-medium mr-4">Filter by:</span>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeFilter === filter.key
                        ? "bg-pink-600 text-white"
                        : "bg-white text-gray-700 hover:bg-pink-100"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredGallery.length === 0 ? (
              <div className="text-center py-12">
                <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">No items found for the selected filter.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGallery.map((item) => (
                  <div
                    key={item._id}
                    className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    onClick={() => openModal(item)}
                  >
                    <div className="aspect-w-4 aspect-h-3">
                      {item.type === "image" ? (
                        <img
                          src={item.url || "/placeholder.svg?height=300&width=400"}
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                          <Video className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.type === "image" ? (
                          <ImageIcon className="h-8 w-8 text-white" />
                        ) : (
                          <Video className="h-8 w-8 text-white" />
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                      <p className="text-gray-300 text-xs capitalize">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl max-h-full overflow-auto">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{selectedItem.title}</h3>
                  <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">
                    ×
                  </button>
                </div>
              </div>
              <div className="p-4">
                {selectedItem.type === "image" ? (
                  <img
                    src={selectedItem.url || "/placeholder.svg"}
                    alt={selectedItem.title}
                    className="w-full max-h-96 object-contain"
                  />
                ) : (
                  <video src={selectedItem.url} controls className="w-full max-h-96">
                    Your browser does not support the video tag.
                  </video>
                )}
                {selectedItem.description && <p className="mt-4 text-gray-600">{selectedItem.description}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default GalleryPage
