import { graphql } from "@mangadex/gql/gql";

export const internalSessionQueueOrderIDsGQLDocs = graphql(`
	subscription internalSessionQueueOrderIDs {
		watchInternalUploadQueueListIds
	}
`);
