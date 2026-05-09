import type { ResultOf } from "@graphql-typed-document-node/core";
import { graphql } from "@mangadex/gql";

export const ContentProfileItemFragment = graphql(`
	fragment ContentProfileItem on ContentProfile {
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
`);

export type ContentProfileItemFragmentType = ResultOf<typeof ContentProfileItemFragment>;