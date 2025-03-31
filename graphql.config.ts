import type { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    projects: {
        mangadex: {
            documents: [
                "./apps/mangadex/**/*.svelte",
                "./apps/mangadex/**/*.ts"
            ],
            schemaPath: "./apps/mangadex/lib/schemas.graphqls",
            includes: ["./apps/mangadex/**/*"]
        }
    },
    excludes: ["./src-tauri/*", "./.svelte-kit/*"]
};

export default config;
