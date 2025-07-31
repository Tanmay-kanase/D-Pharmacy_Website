import React, { useEffect, useState } from "react";
import { FaUserEdit, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div className="text-center py-20">Loading user data...</div>;
  }

  const handleLogout = () => {
    localStorage.clear(); // Remove token and user data
    navigate("/"); // Navigate to home
    window.location.reload(); // Force page reload
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Image Section */}
          <div className="relative group">
            <img
              src={user.profileUrl}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-blue-200"
            />
            <label
              htmlFor="fileUpload"
              className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition duration-300 group-hover:opacity-100 opacity-0"
              title="Upload New Photo"
            >
              <MdOutlineFileUpload size={18} />
            </label>
            <input id="fileUpload" type="file" className="hidden" />
          </div>

          {/* Info Section */}
          <div className="flex-1 space-y-6 w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                Profile Details
              </h2>
              <button className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                <FaUserEdit /> Edit
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4">
                <FaUserEdit className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="text-lg font-medium text-gray-800">
                    {user.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaEnvelope className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-lg font-medium text-gray-800">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <FaUserShield className="text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="text-lg font-medium capitalize text-gray-800">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end gap-4">
              <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                Cancel
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Save Changes
              </button>
              <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
