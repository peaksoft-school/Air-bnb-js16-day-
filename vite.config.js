import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com',
            changeOrigin: true,
         },
      },
   },
})
