
import { GraduationCap, Users, Building, FileText } from "lucide-react";

export default function Highlights() {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Courses",
      description:
        "Comprehensive Diploma in Pharmacy program with modern curriculum",
      link: "/courses",
      color: "bg-blue-500",
    },
    {
      icon: Building,
      title: "Facilities",
      description:
        "State-of-the-art laboratories, library, and modern infrastructure",
      link: "/facilities",
      color: "bg-green-500",
    },
    {
      icon: Users,
      title: "Faculty",
      description:
        "Experienced and qualified faculty members dedicated to excellence",
      link: "/faculty",
      color: "bg-purple-500",
    },
    {
      icon: FileText,
      title: "Notices",
      description:
        "Stay updated with latest announcements and important information",
      link: "/notices",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover what makes our D. Pharmacy program stand out in
            pharmaceutical education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <a key={index} href={item.link} className="group">
              <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
                <div
                  className={`${item.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
