import axios from 'axios'

const BASE_URL = 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com'

export const axiosInstance = axios.create({
   baseURL: BASE_URL,

   headers: {
      'Content-Type': 'application/json',
   },
})

let customStore

export const injectStore = (_store) => {
   customStore = _store
}

export const getStore = () => customStore

axiosInstance.interceptors.request.use(
   (config) => {
      const updateConfig = { ...config }
      const token = customStore.getState()?.auth?.accessToken

      if (true) {
         updateConfig.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDY0MzQyODksImV4cCI6MTc0NjUzNDI4OX0._1penmq1nOVqa_tXE1GGB5bl42Qgk0tzvbfc95Ahi-o`
      }

      return updateConfig
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
      if (error.response.status === 401) {
         customStore.dispatch()
      }

      return Promise.reject(error)
   }
)
