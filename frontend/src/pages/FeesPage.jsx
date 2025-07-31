import { Helmet } from "react-helmet"
import Layout from "../components/layout/Layout"
import { CreditCard, Calculator, FileText, Phone } from "lucide-react"

const FeesPage = () => {
  const feeStructure = [
    {
      year: "First Year",
      tuitionFee: 45000,
      labFee: 8000,
      libraryFee: 2000,
      examFee: 3000,
      developmentFee: 5000,
      total: 63000,
    },
    {
      year: "Second Year",
      tuitionFee: 45000,
      labFee: 8000,
      libraryFee: 2000,
      examFee: 3000,
      developmentFee: 5000,
      total: 63000,
    },
  ]

  const additionalFees = [
    { item: "Admission Fee (One-time)", amount: 5000 },
    { item: "Caution Deposit (Refundable)", amount: 3000 },
    { item: "Uniform & Books (Approx.)", amount: 8000 },
    { item: "ID Card & Other Charges", amount: 1000 },
  ]

  const scholarships = [
    {
      name: "Merit Scholarship",
      criteria: "Top 10% students based on entrance exam",
      benefit: "25% fee waiver",
    },
    {
      name: "Need-based Scholarship",
      criteria: "Family income below ₹2 lakhs per annum",
      benefit: "Up to 50% fee waiver",
    },
    {
      name: "SC/ST Scholarship",
      criteria: "Students from SC/ST category",
      benefit: "Government scholarship applicable",
    },
    {
      name: "Sports Scholarship",
      criteria: "State/National level sports achievements",
      benefit: "15% fee waiver",
    },
  ]

  return (
    <Layout>
      <Helmet>
        <title>Fee Structure - D. Pharmacy College</title>
        <meta
          name="description"
          content="Detailed fee structure for D.Pharm program including tuition fees, additional charges, and scholarship opportunities."
        />
      </Helmet>
      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-green-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h1>
            <p className="text-xl max-w-2xl">
              Transparent and affordable fee structure for quality pharmaceutical education
            </p>
          </div>
        </section>

        {/* Fee Structure Table */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Calculator className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">Annual Fee Structure</h2>
              <p className="text-gray-600 mt-2">Academic Year 2024-25</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tuition Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lab Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Library Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Exam Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Development Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feeStructure.map((fee, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.year}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fee.tuitionFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fee.labFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fee.libraryFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fee.examFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{fee.developmentFee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                          ₹{fee.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Additional Fees */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Fees</h3>
                <div className="space-y-3">
                  {additionalFees.map((fee, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{fee.item}</span>
                      <span className="font-semibold text-blue-600">₹{fee.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Options</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Annual payment with 5% discount</li>
                  <li>• Semester-wise payment available</li>
                  <li>• Online payment through net banking</li>
                  <li>• Demand draft in favor of college</li>
                  <li>• EMI options available through banks</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Scholarships */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <CreditCard className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800">Scholarships Available</h2>
              <p className="text-gray-600 mt-2">Financial assistance for deserving students</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{scholarship.name}</h3>
                  <p className="text-gray-600 mb-3">{scholarship.criteria}</p>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                    {scholarship.benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact for Fees */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Need Help with Fees?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our admission counselors are here to help you understand the fee structure and available financial options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Admission Office
              </a>
              <a
                href="/downloads"
                className="inline-flex items-center border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg hover:bg-green-600 hover:text-white transition-colors"
              >
                <FileText className="h-5 w-5 mr-2" />
                Download Fee Details
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default FeesPage
