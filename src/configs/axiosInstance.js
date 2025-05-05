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
      const token = customStore?.getState()?.auth?.accessToken

      if (token) {
         updateConfig.headers.Authorization = `Bearer ${token}`
      }

      return updateConfig
   },
   (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
   (response) => Promise.resolve(response),
   (error) => {
      if (error.response?.status === 401) {
         console.warn(
            'Unauthorized - consider dispatching logout or redirecting.'
         )
      }

      return Promise.reject(error)
   }
)
