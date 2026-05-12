import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
	projects: {
		mangadex: {
			documents: ["./src/lib/mangadex/**/*.ts"],
			schemaPath: "./src/lib/mangadex/schemas.graphqls",
			includes: ["./src/lib/mangadex/**/*.ts"]
		}
	},
	excludes: ["./src-tauri/*", "./.svelte-kit/*"]
};

export default config;