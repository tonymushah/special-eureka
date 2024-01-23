import { IGraphQLConfig } from "graphql-config";

const config: IGraphQLConfig = {
    "projects": {
        "mangadex": {
            "documents": ['./src/lib/componnents/mangadex/**/*.svelte', './src/lib/store/mangadex/**/*.ts', './src/lib/components/mangadex/**/*.ts', './src/routes/mangadex/**/*.svelte'],
            "schema": './src/lib/schemas/mangadex.graphqls'
        }
    }
};

export default config;