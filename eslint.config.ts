import css from "@eslint/css";
import js from "@eslint/js";
import svelte from "eslint-plugin-svelte";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";
import svelteConfig from "./svelte.config.js";

export default defineConfig([
	{ files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
	{ files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
	tseslint.configs.recommended,
	{ files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
	svelte.configs.prettier,
	{
		files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: [".svelte"],
				parser: tseslint.parser,
				svelteConfig
			}
		}
	},
	{
		ignores: [
			".DS_Store",
			"node_modules",
			"build",
			".svelte-kit",
			"package",
			".env",
			".env.*",
			"!.env.example",
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
			"src-tauri",
			"target",
			"**/*.json"
		]
	}
]);
