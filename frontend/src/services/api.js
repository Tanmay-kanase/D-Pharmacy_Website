const API_BASE_URL = "http://localhost:5000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Faculty API
export const facultyAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/faculty`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`);
    return response.json();
  },

  create: async (facultyData) => {
    const response = await fetch(`${API_BASE_URL}/faculty`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(facultyData),
    });
    return response.json();
  },

  update: async (id, facultyData) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(facultyData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/faculty/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Notices API
export const noticesAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/notices`);
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`);
    return response.json();
  },

  create: async (noticeData) => {
    const response = await fetch(`${API_BASE_URL}/notices`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(noticeData),
    });
    return response.json();
  },

  update: async (id, noticeData) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(noticeData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notices/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Gallery API
export const galleryAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/gallery`);
    return response.json();
  },

  create: async (galleryData) => {
    const response = await fetch(`${API_BASE_URL}/gallery`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(galleryData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/gallery/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Downloads API
export const downloadsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/downloads`);
    return response.json();
  },

  create: async (downloadData) => {
    const response = await fetch(`${API_BASE_URL}/downloads`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(downloadData),
    });
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/downloads/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return response.json();
  },
};

// Contact API
export const contactAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      headers: getAuthHeaders(),
    });
    return response.json();
  },

  create: async (contactData) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactData),
    });
    return response.json();
  },
};
