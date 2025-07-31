import { Link } from "react-router-dom";
import { ArrowRight, Users, Award, BookOpen } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to D. Pharmacy College
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Shaping the future of pharmaceutical sciences with excellence in
            education, research, and healthcare
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/admission"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Apply Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <Users className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">500+</h3>
            <p className="text-blue-100">Students</p>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">25+</h3>
            <p className="text-blue-100">Years of Excellence</p>
          </div>
          <div className="text-center">
            <BookOpen className="h-12 w-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold">95%</h3>
            <p className="text-blue-100">Placement Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
