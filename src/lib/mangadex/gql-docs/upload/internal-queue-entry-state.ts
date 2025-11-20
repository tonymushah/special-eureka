import { graphql } from "@mangadex/gql/gql";

export const internalQueueEntryStateGQLDocs = graphql(`
	subscription internalQueueEntryState($id: UUID!) {
		watchInternalUploadQueueState(id: $id)
	}
`);
