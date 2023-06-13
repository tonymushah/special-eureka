import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import remarkRehypePlugin from "vite-plugin-remark-rehype";
import { resolve } from "path";
import { ViteAliases } from "vite-aliases";
import mdx from "@mdx-js/rollup";

export default defineConfig({
    clearScreen: false,
    plugins: [
        mdx(),
        //ReactInspector(),
        //progress(),
        ViteAliases({
            "dir": "src",
            useConfig: true,
            useTypescript: true
        }),
        react({
            "tsDecorators": true
        }),
        remarkRehypePlugin({
        }),
    ],
    envPrefix: ["VITE_", "TAURI_"],
    server: {
        port: 9305,
        strictPort: true,
        open: false,
        fs : {
            allow : ["../node_modules/.pnpm/flag-icons@6.6.6", ".", "../node_modules/.pnpm/*"]
        }
    },
    build: {
        // Tauri supports es2021
        target: ["es2021", "chrome100", "safari13"],
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_DEBUG,
        outDir: "../dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "src/index.html"),
                splashscreen: resolve(__dirname, "src/splashscreen.html")
            },
        },
        "emptyOutDir": true
    },
    root: "./src",
    publicDir: "./public"
});