/*------------------------------
Imports
------------------------------*/
import glsl from 'vite-plugin-glsl';
import { defineConfig } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

/*------------------------------
 
Setup
 
------------------------------*/

export default defineConfig({
  root: 'src/',
  publicDir: '../static/',
  base: './',

  appType: 'spa',
  plugins: [glsl(), createHtmlPlugin({ minify: true })],

  server: { host: '0.0.0.0' },
  preview: { host: '0.0.0.0' },

  build: {
    outDir: '../dist/',
    sourcemap: false,
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
  },
});
