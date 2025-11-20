import { graphql } from "@mangadex/gql/gql";

export const swapInternalQueueOrderMutationGQLDocs = graphql(`
	mutation swapInternalQueueOrder($a: UUID!, $b: UUID!) {
		upload {
			internal {
				swapQueueOrder(a: $a, b: $b)
			}
		}
	}
`);
