import { graphql } from "@mangadex/gql/gql";

export const setCommitDataToInternalSessionMutationGQLDocs = graphql(`
	mutation setCommitDataInternalSession(
		$sessionId: UUID!
		$commitData: InternUploadSessionCommitDataInput!
		$startRunner: Boolean
	) {
		upload {
			internal {
				session(id: $sessionId) {
					setCommitData(commitData: $commitData, startRunner: $startRunner)
				}
			}
		}
	}
`);
