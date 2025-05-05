// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;