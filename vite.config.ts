import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ['src'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx']
    }),
    // Copy font files to dist/fonts/ during build
    viteStaticCopy({
      targets: [
        {
          src: 'src/fonts/*.woff2',
          dest: 'fonts'
        }
      ]
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime'
        },
        // Ensure font files are copied to dist/fonts/
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.woff2')) {
            return 'fonts/[name][extname]'
          }
          return 'assets/[name][extname]'
        }
      }
    },
    cssCodeSplit: false,
    sourcemap: true,
    // Prevent inlining of assets - force them to be emitted as separate files
    assetsInlineLimit: 0
  },
  // Treat .woff2 files as static assets
  assetsInclude: ['**/*.woff2'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
