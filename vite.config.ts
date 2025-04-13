import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { kitRoutes } from "vite-plugin-kit-routes";

export default defineConfig({
	plugins: [sveltekit(), kitRoutes()],
	test: {
		include: ["src/**/*.{test,spec}.{js,ts}", "apps/**/*.{test,spec}.{js,ts}"]
	},
	optimizeDeps: {
		exclude: ["@urql/svelte", "@urql/core"]
	},
	// prevent vite from obscuring rust errors
	clearScreen: false,
	// Tauri expects a fixed port, fail if that port is not available
	server: {
		port: 9305,
		strictPort: true,
		fs: {
			deny: [
				"../src-tauri",
				".env",
				".env.*",
				"*.crt",
				"*.pem",
				"../target",
				"../data"
			]
		},
		watch: {
			ignored: [`${searchForWorkspaceRoot(process.cwd())}/src-tauri`, `${searchForWorkspaceRoot(process.cwd())}/target`, `${searchForWorkspaceRoot(process.cwd())}/data`]
		}
	},
	// to access the Tauri environment variables set by the CLI with information about the current target
	envPrefix: [
		"VITE_",
		"TAURI_PLATFORM",
		"TAURI_ARCH",
		"TAURI_FAMILY",
		"TAURI_PLATFORM_VERSION",
		"TAURI_PLATFORM_TYPE",
		"TAURI_DEBUG"
	],
	build: {
		// Tauri uses Chromium on Windows and WebKit on macOS and Linux
		target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
		// don't minify for debug builds
		minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
		// produce sourcemaps for debug builds
		sourcemap: !!process.env.TAURI_DEBUG,
		cssMinify: "lightningcss"
	}
});
