import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import {resolve} from "node:path";
import sveltePreprocess from 'svelte-preprocess';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [
      svelte({
      preprocess: sveltePreprocess({
        postcss: true
      })
    })
  ],

    resolve: {
      alias: {
        $lib: resolve("./src/renderer/src/lib")
      }
    }
  }
})
