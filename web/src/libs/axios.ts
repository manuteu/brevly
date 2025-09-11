import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_END_POINT || 'http://localhost:3333/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
