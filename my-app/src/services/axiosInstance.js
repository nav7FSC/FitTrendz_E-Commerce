import axios from 'axios';
import { useAuth } from '../components/AuthContext';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
});

// api.interceptors.request.use(config => {
//   //const token = getAccessToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//     response => response,
//     error => {
//         const currentPath = window.location.pathname;

//         if (currentPath !== '/login') {
//           window.location.href = '/login';
//         }
//       return Promise.reject(error);
//     }
//   );

  export default api;