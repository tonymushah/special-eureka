import { graphql } from "@mangadex/gql";

export const subscription = graphql(`
	subscription watchDefaultContentProfile {
		watchContentProfileDefault {
			originalLanguages
			publicationDemographic
			includedTags
			includedTagsMode
			excludedTags
			excludedTagsMode
			status
			excludedOriginalLanguage
			translatedLanguages
			contentRating
			excludedGroups
			excludedUploaders
		}
	}
`);

export const mutation = graphql(`
	mutation updateDefaultContentProfile($entry: ContentProfileInput!) {
		userOption {
			updateDefaultContentProfile(profile: $entry) {
				originalLanguages
				publicationDemographic
				includedTags
				includedTagsMode
				excludedTags
				excludedTagsMode
				status
				excludedOriginalLanguage
				translatedLanguages
				contentRating
				excludedGroups
				excludedUploaders
			}
		}
	}
`);

export const query = graphql(`
	query getDefaultContentProfile {
		userOption {
			getDefaultContentProfile {
				originalLanguages
				publicationDemographic
				includedTags
				includedTagsMode
				excludedTags
				excludedTagsMode
				status
				excludedOriginalLanguage
				translatedLanguages
				contentRating
				excludedGroups
				excludedUploaders
			}
		}
	}
`);
