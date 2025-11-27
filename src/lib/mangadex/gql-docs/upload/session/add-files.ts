import { graphql } from "@mangadex/gql/gql";

export const addFilesToInternalSessionMutationGQLDocs = graphql(`
	mutation addFilesInternalSession($sessionId: UUID!, $imgPaths: [String!]!, $index: Int) {
		upload {
			internal {
				session(id: $sessionId) {
					addFiles(imgPaths: $imgPaths, index: $index)
				}
			}
		}
	}
`);
