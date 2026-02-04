import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/csuf-mgmt339/ops-strategy/',
  build: {
    outDir: '../../dist/ops-strategy'
  }
})
