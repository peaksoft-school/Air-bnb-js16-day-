import axios from 'axios'

const BASE_URL = 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com'

export const axiosInstance = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'application/json',
   },
})

let customStore

export const injectStore = (store) => {
   customStore = store
}

axiosInstance.interceptors.request.use(
   (config) => {
      const { token } = customStore.getState()?.auth

      if (token) {
         config.headers.Authorization = `Bearer ${token}`
      }

      return config
   },

   (error) => {
      return Promise.reject(error)
   }
)

axiosInstance.interceptors.response.use(
   (response) => {
      return Promise.resolve(response)
   },

   (error) => {
      if (error.response?.status === 401) {
      }

      return Promise.reject(error)
   }
)
