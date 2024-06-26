import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    define: {
      'process.env': {},
    },
    server: {
      port: 3000,
      strictPort: false,
      open: true,
    },
    build: {
      outDir: 'dist',
      target: 'modules',
    },
    publicDir: 'public',
    plugins: [react(), nodePolyfills()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~@': resolve(__dirname, './src'),
      },
    },
  }
})
