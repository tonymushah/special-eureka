import { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    "projects": {
        "mangadex": {
            "documents": ['./src/lib/mangadex/**/*.svelte', './src/lib/mangadex/**/*.ts', './src/routes/mangadex/**/*.svelte'],
            "schema": './src/lib/mangadex/schemas.graphqls'
        }
    }
};

export default config;