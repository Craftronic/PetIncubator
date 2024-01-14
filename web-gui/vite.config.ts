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
    assetsDir: '',
  },
  plugins: [
    react(),
    { ...minifyHTML(), enforce: "pre", apply: "build" },
    viteSingleFile(),
    {
      ...ViteMinifyHtml({ removeComments: true }),
      enforce: "post",
      apply: "build",
    },
    {
      ...gzipPlugin({ filter: /\.(js|css|html|svg)$/ }),
      enforce: "post",
      apply: "build",
    },
  ],
})
