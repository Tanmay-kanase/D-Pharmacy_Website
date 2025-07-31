import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";

// Public Pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import CoursesPage from "./pages/CoursesPage";
import FacultyPage from "./pages/FacultyPage";
import AdmissionPage from "./pages/AdmissionPage";
import FeesPage from "./pages/FeesPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import GalleryPage from "./pages/GalleryPage";
import NoticesPage from "./pages/NoticesPage";
import DownloadsPage from "./pages/DownloadsPage";
import ContactPage from "./pages/ContactPage";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageFaculty from "./pages/admin/ManageFaculty";
import ManageNotices from "./pages/admin/ManageNotices";
import ManageGallery from "./pages/admin/ManageGallery";
import ManageDownloads from "./pages/admin/ManageDownloads";
import ContactQueries from "./pages/admin/ContactQueries";

// Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>D. Pharmacy College - Premier Pharmaceutical Education</title>
        <meta
          name="description"
          content="Leading D.Pharm college offering quality pharmaceutical education with modern facilities and experienced faculty."
        />
        <meta
          name="keywords"
          content="D.Pharm, Pharmacy College, Pharmaceutical Education, Medical College"
        />
      </Helmet>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/faculty" element={<FacultyPage />} />
        <Route path="/admission" element={<AdmissionPage />} />
        <Route path="/fees" element={<FeesPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/notices" element={<NoticesPage />} />
        <Route path="/downloads" element={<DownloadsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/faculty" element={<ManageFaculty />} />
        <Route path="/admin/notices" element={<ManageNotices />} />
        <Route path="/admin/gallery" element={<ManageGallery />} />
        <Route path="/admin/downloads" element={<ManageDownloads />} />
        <Route path="/admin/contacts" element={<ContactQueries />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
