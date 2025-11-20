import { graphql } from "@mangadex/gql/gql";

export const removeFilesToInternalSessionMutationGQLDocs = graphql(`
	mutation removeFilesInternalSession($sessionId: UUID!, $imgPaths: [String!]!) {
		upload {
			internal {
				session(id: $sessionId) {
					removeFiles(imgPaths: $imgPaths)
				}
			}
		}
	}
`);
