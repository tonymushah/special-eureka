import { graphql } from "@mangadex/gql/gql";

export const removeFileToInternalSessionMutationGQLDocs = graphql(`
	mutation removeFileInternalSession($sessionId: UUID!, $imgPath: String!) {
		upload {
			internal {
				session(id: $sessionId) {
					removeFile(imgPath: $imgPath)
				}
			}
		}
	}
`);
