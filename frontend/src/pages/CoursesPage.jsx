import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { BookOpen, Clock, Users, Award, Download } from "lucide-react"

const CoursesPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Courses - D. Pharmacy College</title>
        <meta
          name="description"
          content="Explore our comprehensive Diploma in Pharmacy (D.Pharm) program with modern curriculum and excellent career opportunities."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Courses Offered</h1>
            <p className="text-xl max-w-2xl">
              Comprehensive pharmaceutical education program designed for future pharmacy professionals
            </p>
          </div>
        </section>

        {/* Course Details */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8">
                <h2 className="text-3xl font-bold mb-2">Diploma in Pharmacy (D.Pharm)</h2>
                <p className="text-green-100">Two-year comprehensive pharmaceutical education program</p>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Duration</h4>
                    <p className="text-gray-600">2 Years</p>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Intake</h4>
                    <p className="text-gray-600">60 Students</p>
                  </div>
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Mode</h4>
                    <p className="text-gray-600">Full Time</p>
                  </div>
                  <div className="text-center">
                    <Award className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h4 className="font-semibold">Recognition</h4>
                    <p className="text-gray-600">PCI Approved</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Course Overview</h3>
                    <p className="text-gray-600 mb-4">
                      The Diploma in Pharmacy (D.Pharm) is a two-year program designed to provide comprehensive
                      knowledge in pharmaceutical sciences. The course covers both theoretical and practical aspects of
                      pharmacy practice.
                    </p>
                    <p className="text-gray-600 mb-4">
                      Students will gain expertise in drug formulation, quality control, pharmaceutical chemistry,
                      pharmacology, and pharmacy practice. The program includes extensive laboratory work and industrial
                      training.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Career Opportunities</h3>
                    <ul className="text-gray-600 space-y-2">
                      <li>• Community Pharmacist</li>
                      <li>• Hospital Pharmacist</li>
                      <li>• Quality Control Analyst</li>
                      <li>• Production Executive</li>
                      <li>• Medical Representative</li>
                      <li>• Drug Inspector</li>
                      <li>• Research Assistant</li>
                      <li>• Pharmaceutical Sales</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Curriculum Highlights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">First Year</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Pharmaceutics-I</li>
                        <li>• Pharmaceutical Chemistry-I</li>
                        <li>• Pharmacognosy</li>
                        <li>• Biochemistry & Clinical Pathology</li>
                        <li>• Human Anatomy & Physiology</li>
                        <li>• Health Education & Community Pharmacy</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Second Year</h4>
                      <ul className="text-gray-600 space-y-1">
                        <li>• Pharmaceutics-II</li>
                        <li>• Pharmaceutical Chemistry-II</li>
                        <li>• Pharmacology & Toxicology</li>
                        <li>• Pharmaceutical Jurisprudence</li>
                        <li>• Drug Store & Business Management</li>
                        <li>• Hospital & Clinical Pharmacy</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <a
                    href="/downloads"
                    className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Syllabus
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default CoursesPage
