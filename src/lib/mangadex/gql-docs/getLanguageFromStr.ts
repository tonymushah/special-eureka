import { graphql } from "@mangadex/gql/exports";

export const getLanguageFromStrQuery = graphql(`
	query getLanguageFromStr($lang: String!) {
		utils {
			strToLanguage(input: $lang)
		}
	}
`);
