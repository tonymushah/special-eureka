import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
	schema: "./src/lib/mangadex/schemas.graphqls",
	documents: [
		"./src/lib/mangadex/**/*.ts"
		// TODO fix this
		//"./src/routes/(app)/mangadex/**/*.svelte",
		//"./src/routes/(app)/mangadex/**/*.ts"
	],
	ignoreNoDocuments: false, // for better experience with the watcher
	generates: {
		"./src/lib/mangadex/gql/": {
			preset: "client-preset",
			config: {
				useTypeImports: true,
				fragmentMaking: false,
				enumType: "native",
				scalars: {
					UUID: "string",
					JSONObject: "Record<string, unknown>",
					LocalDateTime: "string",
					MangaDexDateTime: "string",
					MangaDexDuration: "string",
					Password: "string",
					PathBuf: "string",
					Url: "string",
					Username: "string"
				},
				maybeValue: "T | null | undefined",
				inputMaybeValue: "T | null | undefined",
				extractAllFieldsToTypes: true
			},
			plugins: []
		}
	}
};

export default config;