"use client";

import { useState, useEffect } from "react";
import { Calendar, FileText, ArrowRight } from "lucide-react";

export default function RecentNotices() {
  const [notices, setNotices] = useState([]);

  // Mock data - replace with API call
  useEffect(() => {
    const mockNotices = [
      {
        id: 1,
        title: "Admission Open for Academic Year 2024-25",
        date: "2024-01-15",
        description:
          "Applications are now open for D.Pharm course. Last date for submission is March 31, 2024.",
      },
      {
        id: 2,
        title: "Annual Sports Day Celebration",
        date: "2024-01-10",
        description:
          "Join us for the annual sports day celebration on February 15, 2024.",
      },
      {
        id: 3,
        title: "Pharmacy Week Events",
        date: "2024-01-05",
        description:
          "Special events and workshops during National Pharmacy Week from January 20-26, 2024.",
      },
    ];
    setNotices(mockNotices);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Latest Notices
          </h2>
          <a
            href="/notices"
            className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center text-gray-500 text-sm mb-2">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(notice.date).toLocaleDateString()}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {notice.title}
              </h3>
              <p className="text-gray-600 text-sm">{notice.description}</p>
              <a
                href={`/notices/${notice.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center mt-3"
              >
                Read More <FileText className="ml-1 h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
