import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    projects: {
        mangadex: {
            documents: [
                "./src/lib/mangadex/**/*.svelte",
                "./src/lib/mangadex/**/*.ts",
                "./src/lib/mangadex/**/*.svelte",
                "./src/lib/mangadex/**/*.ts"
            ],
            schemaPath: "./src/lib/mangadex/schemas.graphqls",
            includes: ["./src/lib/mangadex/**/*.ts", "./src/lib/mangadex/**/*.svelte", "./src/routes/mangadex/**/*.ts", "./src/routes/mangadex/**/*.svelte"]
        }
    },
    excludes: ["./src-tauri/*", "./.svelte-kit/*"]
};

export default config;
