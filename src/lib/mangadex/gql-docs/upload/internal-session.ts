import { graphql } from "@mangadex/gql/gql";

export const internalSessionGQLDocs = graphql(`
	subscription internalUploadSessionData($id: UUID!) {
		watchInternalUploadSessionObj(id: $id) {
			mangaId
			groups
			commitData {
				chapter
				title
				translatedLanguage
				externalUrl
				publishAt
				termsAccepted
			}
			images
		}
	}
`);
