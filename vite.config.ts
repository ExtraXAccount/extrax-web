import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    // backup to https://image.francium.io/backup
    // base: 'https://image.francium.io/backup',
    define: {
      'process.env': {},
    },
    plugins: [react(), nodePolyfills()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~@': resolve(__dirname, './src'),
      },
    },
  }
})
