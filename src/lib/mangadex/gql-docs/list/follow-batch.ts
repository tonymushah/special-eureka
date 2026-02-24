import { graphql } from "@mangadex/gql/gql";

export const followMDListBatchGQLDoc = graphql(`
	mutation followMDListBatch($ids: [UUID!]!) {
		customList {
			followBatch(ids: $ids)
		}
	}
`);

export const unfollowMDListBatchGQLDoc = graphql(`
	mutation unfollowMDListBatch($ids: [UUID!]!) {
		customList {
			unfollowBatch(ids: $ids)
		}
	}
`);
