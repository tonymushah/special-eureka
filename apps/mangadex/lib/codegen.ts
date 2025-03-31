import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./apps/mangadex/lib/schemas.graphqls",
    documents: [
        // "./src/lib/mangadex/**/*.svelte",
        "./apps/mangadex/**/*.ts",
        // "src/routes/mangadex/**/*.svelte",
    ],
    ignoreNoDocuments: false, // for better experience with the watcher
    generates: {
        "./apps/mangadex/lib/gql/": {
            preset: "client",
            config: {
                useTypeImports: true
            },
            plugins: []
        }
    }
};

export default config;
