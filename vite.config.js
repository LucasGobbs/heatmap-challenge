import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { sveltePreprocess } from 'svelte-preprocess'
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  base: '/heatmap/',
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        typescript: true
      })
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'images',
          dest: ''
        },
      ]
    })
  ],
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
