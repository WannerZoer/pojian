import axios from 'axios';
import toast from 'react-hot-toast';
import { getToken, removeToken } from '../utils/auth';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          removeToken();
          window.location.href = '/login';
          break;
        case 403:
          toast.error('没有权限访问该资源');
          break;
        case 404:
          toast.error('请求的资源不存在');
          break;
        case 500:
          toast.error('服务器错误');
          break;
        default:
          toast.error(error.response.data.message || '请求失败');
      }
    } else if (error.request) {
      toast.error('网络错误，请检查网络连接');
    } else {
      toast.error('请求配置错误');
    }
    return Promise.reject(error);
  }
);

export default api;