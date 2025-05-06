import axios from 'axios';
import { getAccessToken } from '../components/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

api.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;
    const isRefreshRequest = originalRequest.url.includes("/auth/refresh");

    if (err.response?.status === 401 && !isRefreshRequest) {
      try {
        const res = await api.get("/auth/refresh");
        accessToken = res.data.accessToken;
        console.log("Tokens refreshed");
      } catch (refreshErr) {
        console.log("Refresh failed", refreshErr);
      }
    }
    return Promise.reject(err);
  }
);


  export default api;