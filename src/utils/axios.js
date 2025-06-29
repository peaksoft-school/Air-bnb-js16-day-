import axios from 'axios'

const instance = axios.create({
   baseURL: 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com/api',
})

instance.interceptors.request.use((config) => {
   const id = localStorage.getItem('authToken')

   if (id) {
      config.headers.Authorization = `Bearer ${id}`
   }
   return config
})

export default instance
