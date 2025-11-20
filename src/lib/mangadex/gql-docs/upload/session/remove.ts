import { graphql } from "@mangadex/gql/gql";

export const removeInternalSessionMutationGQLDocs = graphql(`
	mutation removeInternalSession($sessionId: UUID!) {
		upload {
			internal {
				session(id: $sessionId) {
					remove
				}
			}
		}
	}
`);
