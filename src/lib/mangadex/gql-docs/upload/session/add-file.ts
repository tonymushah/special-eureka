import { graphql } from "@mangadex/gql/gql";

export const addFileToInternalSessionMutationGQLDocs = graphql(`
	mutation addFileInternalSession($sessionId: UUID!, $imgPath: String!, $index: Int) {
		upload {
			internal {
				session(id: $sessionId) {
					addFile(imgPath: $imgPath, index: $index)
				}
			}
		}
	}
`);
