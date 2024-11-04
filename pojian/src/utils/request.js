import axios from 'axios';
import { getToken } from './auth';

const createClient = (options = {}) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: options.timeout || 15000,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  // Add auth token to requests
  client.interceptors.request.use(config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // Handle responses
  client.interceptors.response.use(
    response => response.data,
    error => {
      if (error.response) {
        // Server responded with error
        const { status, data } = error.response;
        return Promise.reject({
          status,
          message: data.message || 'Server error',
          data: data
        });
      } else if (error.request) {
        // Request made but no response
        return Promise.reject({
          status: 0,
          message: 'Network error'
        });
      } else {
        // Request setup error
        return Promise.reject({
          status: 0,
          message: 'Request failed'
        });
      }
    }
  );

  return client;
};

export default createClient;