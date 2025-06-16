import axios from 'axios';

const api = axios.create({
  baseURL: '/api',  // This is correct as the backend mounts routes at /api
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true  // Important for sending/receiving cookies
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    // No need to manually add token as it's handled by cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // No need to remove token from localStorage as we're using cookies
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const login = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};


// Media Upload API
export const uploadMedia = async (file, metadata) => {
  const formData = new FormData();
  formData.append('images', file);
  formData.append('imageData', JSON.stringify({
    title: metadata.title,
    description: metadata.description,
    marketingVertical: metadata.category
  }));
  
  const response = await api.post('/upload', formData, {  // Removed /admin prefix
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

// Enquiry API
export const submitEnquiry = async (enquiryData) => {
  const response = await api.post('/admin/enquiry', enquiryData);  // Updated to match backend route
  return response.data;
};

// Fetch all verticals with their media items
export const fetchVerticals = async () => {
  try {
    const response = await api.get('/verticals');  // Removed /admin since it's not in the backend route
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching verticals:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'Failed to fetch verticals');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up request');
    }
  }
};

// Fetch media items by vertical
export const fetchMediaByVertical = async (vertical) => {
  try {
    const response = await api.get(`/media/${vertical}`);  // Removed /admin since it's not in the backend route
    if (!response.data) {
      throw new Error('No data received from server');
    }
    return response.data;
  } catch (error) {
    console.error('Error fetching media items:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'Failed to fetch media items');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error setting up request');
    }
  }
};

export default api; 