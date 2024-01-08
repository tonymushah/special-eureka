import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: './src/lib/schemas/mangadex.graphqls',
    documents: ['src/lib/components/mangadex/**/*.svelte', 'src/lib/store/mangadex/**/*.ts', 'src/lib/components/mangadex/**/*.ts', 'src/routes/mangadex/**/*.svelte'],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        './src/lib/gql/mangadex/': {
            preset: 'client',
            config: {
                useTypeImports: true,
            },
            plugins: [],
        },
    },
};

export default config;