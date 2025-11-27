import { graphql } from "@mangadex/gql/gql";

export const sendInternalSessionInQueueMutationGQLDocs = graphql(`
	mutation sendInternalSessionInQueue($sessionId: UUID!) {
		upload {
			internal {
				session(id: $sessionId) {
					sendInQueue
				}
			}
		}
	}
`);
