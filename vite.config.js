import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hotels-api.academlo.tech', // La URL de la API
        changeOrigin: true, // Cambia el origen de la solicitud para que coincida con el target
        rewrite: (path) => path.replace(/^\/api/, '') // Elimina el prefijo /api de la URL
      }
    }
  }
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })