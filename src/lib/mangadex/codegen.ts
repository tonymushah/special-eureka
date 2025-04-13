import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "./src/lib/mangadex/schemas.graphqls",
    documents: [
        "./src/lib/mangadex/**/*.svelte",
    		"./src/lib/mangadex/**/*.ts",
    		"./src/routes/mangadex/**/*.svelte",
    		"./src/routes/mangadex/**/*.ts",
    ],
    ignoreNoDocuments: false, // for better experience with the watcher
    generates: {
        "./src/lib/mangadex/gql/": {
            preset: "client",
            config: {
                useTypeImports: true
            },
            plugins: []
        }
    }
};

export default config;
