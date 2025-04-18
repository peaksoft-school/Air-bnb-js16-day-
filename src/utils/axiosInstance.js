// src/utils/axiosInstance.js
import axios from 'axios'

const axiosInstance = axios.create({
   baseURL: 'https://427317ee8e6aa887.mokky.dev/api',
   headers: { 'Content-Type': 'application/json' },
})

axiosInstance.interceptors.request.use(
   (config) => {
      const auth = localStorage.getItem('auth')
      if (auth) {
         const { token } = JSON.parse(auth)
         config.headers.Authorization = `Bearer ${token}`
      }
      return config
   },
   (error) => Promise.reject(error)
)

export default axiosInstance
