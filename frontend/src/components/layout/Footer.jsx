import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* College Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">D. Pharmacy College</h3>
            <p className="text-gray-300 mb-4">
              Premier institution for Diploma in Pharmacy education, committed
              to excellence in pharmaceutical sciences and healthcare.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Twitter className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Instagram className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
              <Linkedin className="h-5 w-5 text-gray-300 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="text-gray-300 hover:text-white">
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to="/admission"
                  className="text-gray-300 hover:text-white"
                >
                  Admission
                </Link>
              </li>
              <li>
                <Link
                  to="/facilities"
                  className="text-gray-300 hover:text-white"
                >
                  Facilities
                </Link>
              </li>
              <li>
                <Link to="/notices" className="text-gray-300 hover:text-white">
                  Notices
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-gray-300 mt-1" />
                <p className="text-gray-300 text-sm">
                  123 College Street
                  <br />
                  City, State 12345
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-300" />
                <p className="text-gray-300 text-sm">+91 12345 67890</p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-300" />
                <p className="text-gray-300 text-sm">
                  info@dpharmacycollege.edu
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © {new Date().getFullYear()} D. Pharmacy College. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
