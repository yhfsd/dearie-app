// src/api.js
import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'production'
    ? 'https://dearie-backend.onrender.com/api'
    : '/api'; // 개발 환경에서는 Vite 프록시 사용

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
