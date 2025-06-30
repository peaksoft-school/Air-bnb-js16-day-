import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
   plugins: [react()],
   server: {
      proxy: {
         '/api': {
            target: 'http://ec2-18-119-111-133.us-east-2.compute.amazonaws.com',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
         },
      },
   },
})
