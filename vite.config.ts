import { sentryVitePlugin } from "@sentry/vite-plugin";
import { AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import remarkRehypePlugin from "vite-plugin-remark-rehype";
import { resolve } from "path";
//import { ViteAliases } from "vite-aliases";
import mdx from "@mdx-js/rollup";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import tsConfig from "./tsconfig.json";

function generateAliases(): AliasOptions {
    const returns: AliasOptions = {};
    const tsPaths = tsConfig.compilerOptions.paths;
    for (const key in tsPaths) {
        returns[key.replace("/*", "")] = resolve(__dirname, tsPaths[key][0].replace("/*", ""));
    }
    return returns;
}

export default defineConfig({
    clearScreen: false,
    plugins: [{ enforce: "pre", ...mdx() }, //ReactInspector(),
    //progress(),
    /*ViteAliases({
        "dir": "src",
        useConfig: true,
        useTypescript: true,
        "adjustDuplicates" : true,
    }),*/ react({
        "tsDecorators": true,
        "jsxImportSource" : "react"
    }), remarkRehypePlugin({
    }), ViteImageOptimizer(),
    sentryVitePlugin({
        org: "tony-mushah",
        project: "special-eureka",
        telemetry: false
    })],
    envPrefix: ["VITE_", "TAURI_"],
    server: {
        port: 9305,
        strictPort: true,
        open: false,
        fs: {
            allow: ["../node_modules/.pnpm/flag-icons@6.6.6", ".", "../node_modules/.pnpm/bootstrap@5.2.3_@popperjs+core@2.11.6/node_modules/bootstrap/dist/css/", "../"]
        },
    },
    resolve: {
        alias: {
            ...generateAliases()
        }
    },
    appType: "spa",
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
        "emptyOutDir": true,
    },
    root: "./src",
    publicDir: "./public",
});