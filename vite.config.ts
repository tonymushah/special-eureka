import { defineConfig } from "vite";
//import react from '@vitejs/plugin-react'
import react from "@vitejs/plugin-react-swc";
import remarkRehypePlugin from "vite-plugin-remark-rehype";
//import progress from "vite-plugin-progress";
import { resolve } from "path";
import { ViteAliases } from "vite-aliases";
//import VitePluginLegacy from "@vitejs/plugin-legacy";
//import ReactInspector from 'vite-plugin-react-inspector'
import eslintPlugin from "@nabla/vite-plugin-eslint";
//import eslintRollup from "@rollup/plugin-eslint";
/*function getPathSrc(){
  const path = `${process.cwd()}/src`;
  console.log(path);
  return path;
}*/

export default defineConfig({
  clearScreen: false,
  plugins: [
    //ReactInspector(),
    //progress(),
    ViteAliases({
      "dir" : "src",
      useConfig : true,
      useTypescript : true
    }),
    react({
      "tsDecorators" : true
    }),
    remarkRehypePlugin({
    }),
    eslintPlugin({})
    //splitVendorChunkPlugin()
  ],
  envPrefix: ["VITE_", "TAURI_"],
  server: {
    port: 9305,
    strictPort: true,
    open: false,
  },
  build: {
    // Tauri supports es2021
    target: ["es2021", "chrome100", "safari13"],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    outDir : "../dist",
    rollupOptions : {
      input : {
        main : resolve(__dirname, "src/index.html"),
        splashscreen : resolve(__dirname, "src/splashscreen.html")
      },
    }
  },
  root: "./src",
  publicDir : "./public"
});