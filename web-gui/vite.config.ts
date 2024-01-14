import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { minifyHtml as ViteMinifyHtml } from "vite-plugin-html";
import minifyHTML from "rollup-plugin-minify-html-template-literals";
import { viteSingleFile } from "vite-plugin-singlefile";
import gzipPlugin from "rollup-plugin-gzip";
import { brotliCompressSync } from "zlib";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
  plugins: [
    react(),
    { ...minifyHTML(), enforce: "pre", apply: "build" },
    viteSingleFile({ deleteInlinedFiles: false }),
    {
      ...ViteMinifyHtml({ removeComments: true }),
      enforce: "post",
      apply: "build",
    },
  ],
  server: {
    host: '0.0.0.0'
  }
})
