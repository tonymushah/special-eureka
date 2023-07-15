import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";
import { AliasOptions, defineConfig } from "vite";
import remarkRehypePlugin from "vite-plugin-remark-rehype";
import tsConfig from "./tsconfig.json";

function generateAliases(): AliasOptions{
    const returns : AliasOptions = {};
    const tsPaths = tsConfig.compilerOptions.paths;
    for(const key in tsPaths){
        returns[key.replace("/*", "")] = tsPaths[key][0].replace("/*", "");
    }
    return returns;
}

export default defineConfig({
    clearScreen: false,
    plugins: [
        //ReactInspector(),
        //progress(),
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
    },
    resolve : {
        alias : generateAliases()
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
    publicDir: "./public",
    appType : "spa",
});