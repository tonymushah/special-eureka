import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import remarkRehypePlugin from "vite-plugin-remark-rehype";
import { resolve } from "path";
//import { ViteAliases } from "vite-aliases";
import mdx from "@mdx-js/rollup";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import generouted from "@generouted/react-router/plugin";

export default defineConfig({
    clearScreen: false,
    plugins: [
        { enforce: "pre", ...mdx() },
        tsconfigPaths({
            root: "."
        }),
        react({
            "tsDecorators": true,
            "jsxImportSource": "react"
        }),
        generouted(),
        remarkRehypePlugin({}),
        ViteImageOptimizer(),
        sentryVitePlugin({
            org: "tony-mushah",
            project: "special-eureka",
            telemetry: false
        })
    ],
    envPrefix: ["VITE_", "TAURI_"],
    server: {
        port: 9305,
        strictPort: true,
        open: false,
        fs: {
            allow: ["../node_modules/.pnpm/flag-icons@6.6.6", ".", "../node_modules/.pnpm/bootstrap@5.2.3_@popperjs+core@2.11.6/node_modules/bootstrap/dist/css/", "../"]
        },
    },
    /*resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",     // Must be below test-utils
            "react/jsx-runtime": "preact/jsx-runtime"
        }
    },*/
    appType: "spa",
    build: {
        // Tauri supports es2021
        target: ["es2021", "chrome100", "safari13"],
        // don't minify for debug builds
        minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
        // produce sourcemaps for debug builds
        sourcemap: !!process.env.TAURI_DEBUG,
        outDir: "./dist",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./index.html"),
                splashscreen: resolve(__dirname, "./splashscreen.html")
            },
        },
        "emptyOutDir": true,
    },
    publicDir: "./public",
});