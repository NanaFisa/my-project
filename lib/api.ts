import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000, // 10 second timeout
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add auth headers here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.error('Request Error:', error.message);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('API Error Response:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers,
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('API Error Request:', error.request);
      } else {
        // Something happened in setting up the request
        console.error('API Error:', error.message);
      }
    } else {
      // Non-Axios error
      console.error('Non-Axios Error:', error);
    }
    return Promise.reject(error);
  }
);

export default api;