import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { CheckCircle, Calendar, FileText, CreditCard } from "lucide-react"

const AdmissionPage = () => {
  const steps = [
    {
      step: 1,
      title: "Check Eligibility",
      description: "Ensure you meet the minimum qualification requirements",
      details: [
        "10+2 with Physics, Chemistry, and Biology/Mathematics",
        "Minimum 50% marks in qualifying examination",
        "Age limit: 17-25 years",
      ],
    },
    {
      step: 2,
      title: "Fill Application",
      description: "Complete the online application form with required documents",
      details: ["Online application form", "Academic transcripts", "Identity proof", "Passport size photographs"],
    },
    {
      step: 3,
      title: "Submit Documents",
      description: "Upload all required documents and pay application fee",
      details: [
        "Scanned copies of certificates",
        "Application fee payment",
        "Medical fitness certificate",
        "Character certificate",
      ],
    },
    {
      step: 4,
      title: "Merit List & Admission",
      description: "Check merit list and complete admission process",
      details: ["Merit list publication", "Counseling process", "Fee payment", "Document verification"],
    },
  ]

  const importantDates = [
    { event: "Application Start Date", date: "March 1, 2024" },
    { event: "Application Last Date", date: "May 31, 2024" },
    { event: "Merit List Publication", date: "June 15, 2024" },
    { event: "Counseling Dates", date: "June 20-30, 2024" },
    { event: "Classes Commence", date: "July 15, 2024" },
  ]

  return (
    <Layout>
      <Helmet>
        <title>Admission Process - D. Pharmacy College</title>
        <meta
          name="description"
          content="Learn about our admission process, eligibility criteria, important dates, and how to apply for D.Pharm program."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-orange-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Admission Process</h1>
            <p className="text-xl max-w-2xl">
              Join our prestigious D.Pharm program and start your journey in pharmaceutical sciences
            </p>
          </div>
        </section>

        {/* Admission Steps */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Step-by-Step Admission Guide</h2>

            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
                      <p className="text-gray-600 mb-4">{step.description}</p>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Important Dates */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Calendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">Important Dates</h2>
              <p className="text-gray-600 mt-2">Mark your calendar with these crucial admission dates</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {importantDates.map((item, index) => (
                  <div key={index} className="px-6 py-4 flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{item.event}</span>
                    <span className="text-orange-600 font-medium">{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Apply?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Download the application form and start your journey towards a successful career in pharmacy
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/downloads"
                className="inline-flex items-center bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors"
              >
                <FileText className="h-5 w-5 mr-2" />
                Download Application Form
              </a>
              <a
                href="/fees"
                className="inline-flex items-center border-2 border-orange-600 text-orange-600 px-8 py-3 rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
              >
                <CreditCard className="h-5 w-5 mr-2" />
                View Fee Structure
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default AdmissionPage
