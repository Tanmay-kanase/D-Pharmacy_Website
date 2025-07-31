import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { User, Target, Eye } from "lucide-react"

const AboutPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>About Us - D. Pharmacy College</title>
        <meta
          name="description"
          content="Learn about D. Pharmacy College - our history, mission, vision, and commitment to pharmaceutical education excellence."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
            <p className="text-xl max-w-2xl">
              Learn about our commitment to excellence in pharmaceutical education and healthcare
            </p>
          </div>
        </section>

        {/* College Overview */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">College Overview</h2>
                <p className="text-gray-600 mb-4">
                  D. Pharmacy College has been a pioneer in pharmaceutical education for over 25 years. We are committed
                  to providing quality education that prepares students for successful careers in the pharmaceutical
                  industry.
                </p>
                <p className="text-gray-600 mb-4">
                  Our institution is recognized by the Pharmacy Council of India (PCI) and affiliated with the State
                  Board of Technical Education. We offer a comprehensive Diploma in Pharmacy program that combines
                  theoretical knowledge with practical experience.
                </p>
                <p className="text-gray-600">
                  With state-of-the-art facilities, experienced faculty, and strong industry connections, we ensure our
                  graduates are well-prepared to meet the challenges of the modern pharmaceutical world.
                </p>
              </div>
              <div className="bg-gray-100 rounded-lg p-8">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="College Building"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Principal's Message */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <img
                  src="/placeholder.svg?height=300&width=250"
                  alt="Principal"
                  className="w-full max-w-sm mx-auto rounded-lg shadow-md"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex items-center mb-4">
                  <User className="h-6 w-6 text-blue-600 mr-2" />
                  <h2 className="text-3xl font-bold text-gray-800">Principal's Message</h2>
                </div>
                <div className="text-gray-600 space-y-4">
                  <p>
                    "Welcome to D. Pharmacy College, where we nurture the next generation of pharmaceutical
                    professionals. Our commitment to excellence in education, research, and community service has made
                    us a leading institution in pharmaceutical education."
                  </p>
                  <p>
                    "We believe in providing our students with not just theoretical knowledge, but also practical skills
                    and ethical values that will serve them throughout their careers. Our faculty and staff are
                    dedicated to creating an environment that fosters learning, innovation, and personal growth."
                  </p>
                  <p>
                    "I invite you to explore our programs and discover how D. Pharmacy College can help you achieve your
                    career goals in the pharmaceutical field."
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold text-gray-800">Dr. Sarah Johnson</p>
                    <p className="text-sm text-gray-500">Principal, D. Pharmacy College</p>
                    <p className="text-sm text-gray-500">Ph.D. in Pharmaceutical Sciences</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Vision */}
              <div className="bg-blue-50 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Eye className="h-6 w-6 text-blue-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                </div>
                <p className="text-gray-600">
                  To be a premier institution in pharmaceutical education, recognized globally for excellence in
                  teaching, research, and innovation, while contributing to the advancement of healthcare and
                  pharmaceutical sciences.
                </p>
              </div>

              {/* Mission */}
              <div className="bg-green-50 rounded-lg p-8">
                <div className="flex items-center mb-4">
                  <Target className="h-6 w-6 text-green-600 mr-2" />
                  <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                </div>
                <ul className="text-gray-600 space-y-2">
                  <li>• Provide quality pharmaceutical education with modern curriculum</li>
                  <li>• Foster research and innovation in pharmaceutical sciences</li>
                  <li>• Develop ethical and competent pharmacy professionals</li>
                  <li>• Serve the community through healthcare initiatives</li>
                  <li>• Maintain strong industry partnerships for practical exposure</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AboutPage
