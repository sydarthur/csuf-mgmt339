import { defineConfig } from 'vite'
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  root: '.',
  base: '/csuf-mgmt339/slides/',
  publicDir: false,
  build: {
    outDir: '../dist/slides',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: './index.html',
        test: './test/index.html'
      }
    }
  },
  server: {
    open: '/'
  },
  plugins: [{
    name: 'copy-reveal-files',
    writeBundle() {
      const outDir = resolve(__dirname, '../dist/slides')
      const revealSrc = resolve(__dirname, 'reveal.js')
      const revealDest = resolve(outDir, 'reveal.js')
      const testAssetsSrc = resolve(__dirname, 'test/assets')
      const testAssetsDest = resolve(outDir, 'test/assets')
      const testSlidesMdSrc = resolve(__dirname, 'test/slides.md')
      const testSlidesMdDest = resolve(outDir, 'test/slides.md')

      // Copy entire reveal.js directory to dist
      if (!existsSync(revealDest)) {
        mkdirSync(revealDest, { recursive: true })
      }
      cpSync(revealSrc, revealDest, { recursive: true })
      console.log('✓ Copied reveal.js files to dist/slides/reveal.js')

      // Copy test assets
      if (existsSync(testAssetsSrc)) {
        if (!existsSync(testAssetsDest)) {
          mkdirSync(testAssetsDest, { recursive: true })
        }
        cpSync(testAssetsSrc, testAssetsDest, { recursive: true })
        console.log('✓ Copied test/assets to dist/slides/test/assets')
      }

      // Copy test slides.md
      if (existsSync(testSlidesMdSrc)) {
        copyFileSync(testSlidesMdSrc, testSlidesMdDest)
        console.log('✓ Copied test/slides.md to dist/slides/test/slides.md')
      }
    }
  }]
})
