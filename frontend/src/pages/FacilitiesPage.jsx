import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { FlaskConical, BookOpen, Home, Bus, Users, Stethoscope, Computer, Utensils, Trophy } from "lucide-react"

const FacilitiesPage = () => {
  const facilities = [
    {
      title: "Modern Laboratories",
      icon: FlaskConical,
      description: "State-of-the-art pharmaceutical labs equipped with latest instruments for practical learning.",
      features: [
        "Pharmaceutics Laboratory",
        "Pharmaceutical Chemistry Lab",
        "Pharmacology Lab",
        "Pharmacognosy Lab",
        "Quality Control Lab",
      ],
      color: "bg-blue-500",
    },
    {
      title: "Digital Library",
      icon: BookOpen,
      description: "Comprehensive library with extensive collection of pharmaceutical books and digital resources.",
      features: [
        "10,000+ Books Collection",
        "Digital Library Access",
        "Research Journals",
        "E-books and Online Resources",
        "Reading Rooms",
      ],
      color: "bg-green-500",
    },
    {
      title: "Hostel Accommodation",
      icon: Home,
      description: "Comfortable and secure hostel facilities for outstation students with modern amenities.",
      features: [
        "Separate Boys & Girls Hostel",
        "24/7 Security",
        "Wi-Fi Connectivity",
        "Recreation Rooms",
        "Laundry Facilities",
      ],
      color: "bg-purple-500",
    },
    {
      title: "Transportation",
      icon: Bus,
      description: "Convenient bus service connecting major areas of the city to the college campus.",
      features: [
        "Multiple Bus Routes",
        "GPS Tracking",
        "Experienced Drivers",
        "Regular Maintenance",
        "Affordable Rates",
      ],
      color: "bg-orange-500",
    },
    {
      title: "IT Infrastructure",
      icon: Computer,
      description: "Modern computer labs and campus-wide internet connectivity for digital learning.",
      features: [
        "Computer Laboratory",
        "High-Speed Internet",
        "Wi-Fi Campus",
        "Online Learning Platform",
        "Digital Classrooms",
      ],
      color: "bg-indigo-500",
    },
    {
      title: "Healthcare Center",
      icon: Stethoscope,
      description: "On-campus medical facility to ensure student health and well-being.",
      features: [
        "Qualified Medical Officer",
        "First Aid Facilities",
        "Health Check-ups",
        "Emergency Care",
        "Health Insurance Support",
      ],
      color: "bg-red-500",
    },
    {
      title: "Cafeteria",
      icon: Utensils,
      description: "Hygienic cafeteria serving nutritious and affordable meals for students and staff.",
      features: [
        "Nutritious Meals",
        "Hygienic Environment",
        "Affordable Prices",
        "Variety of Options",
        "Special Diet Arrangements",
      ],
      color: "bg-yellow-500",
    },
    {
      title: "Sports Complex",
      icon: Trophy,
      description: "Sports facilities to promote physical fitness and extracurricular activities.",
      features: ["Indoor Games", "Outdoor Sports Ground", "Gymnasium", "Sports Equipment", "Annual Sports Events"],
      color: "bg-teal-500",
    },
  ]

  return (
    <Layout>
      <Helmet>
        <title>Facilities - D. Pharmacy College</title>
        <meta
          name="description"
          content="Explore our world-class facilities including modern labs, digital library, hostel, transportation, and more amenities."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-indigo-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Facilities</h1>
            <p className="text-xl max-w-2xl">
              World-class infrastructure and modern amenities to support your educational journey
            </p>
          </div>
        </section>

        {/* Facilities Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Campus Facilities</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our campus is equipped with state-of-the-art facilities designed to provide the best learning
                environment for pharmaceutical education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {facilities.map((facility, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className={`${facility.color} p-6 text-white`}>
                    <facility.icon className="h-12 w-12 mb-4" />
                    <h3 className="text-xl font-bold">{facility.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{facility.description}</p>
                    <ul className="space-y-2">
                      {facility.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-700">
                          <div className={`w-2 h-2 ${facility.color} rounded-full mr-3`}></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Campus Tour CTA */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Experience Our Campus</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Visit our campus to see these facilities firsthand and get a feel for student life at D. Pharmacy College
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Users className="h-5 w-5 mr-2" />
                Schedule Campus Tour
              </a>
              <a
                href="/gallery"
                className="inline-flex items-center border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                View Gallery
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default FacilitiesPage
