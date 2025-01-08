import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
	projects: {
		mangadex: {
			documents: [
				"./src/lib/mangadex/**/*.svelte",
				"./src/lib/mangadex/**/*.ts",
				"./src/routes/mangadex/**/*.svelte"
			],
			schemaPath: "./src/lib/mangadex/schemas.graphqls",
			includes: ["./src/lib/mangadex/**/*", "./src/routes/mangadex/**/*"]
		}
	},
	excludes: ["./src-tauri/*", "./.svelte-kit/*"]
};

export default config;
