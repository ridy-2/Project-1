import axios from 'axios';

// Create Axios Instance
const defaultBaseURL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '');
const api = axios.create({
  baseURL: defaultBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Auth Token if available (for future real backend auth)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
