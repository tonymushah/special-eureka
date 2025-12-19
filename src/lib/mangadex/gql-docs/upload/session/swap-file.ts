import { graphql } from "@mangadex/gql/gql";

export const swapSessionFilesMutationGQLDoc = graphql(`
	mutation swapInternalUploadSessionFiles($sessionId: UUID!, $a: Int!, $b: Int!) {
		upload {
			internal {
				session(id: $sessionId) {
					swapFileOrder(a: $a, b: $b)
				}
			}
		}
	}
`);
