import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5173/api',
    withCredentials: true,
});

api.interceptors.response.use(
    response => response,
    error => {
        const currentPath = window.location.pathname;

        if (isUnauthorized && currentPath !== '/login') {
          window.location.href = '/login';
        }
      return Promise.reject(error);
    }
  );

  export default api;