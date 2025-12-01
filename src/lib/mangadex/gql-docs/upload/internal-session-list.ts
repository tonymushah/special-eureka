import { graphql } from "@mangadex/gql/gql";

export const internalSessionListIDsGQLDocs = graphql(`
	subscription internalSessionListIDs {
		watchInternalUploadSessionsListIds
	}
`);
