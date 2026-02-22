import { graphql } from "@mangadex/gql/gql";

export const followMDListBatchGQLDoc = graphql(`
	mutation followMDListBatch($ids: [UUID!]!) {
		customList {
			followBatch(ids: $ids)
		}
	}
`);

export const unfollowMDListGQLDoc = graphql(`
	mutation unfollowMDListBatch($ids: [UUID!]!) {
		customList {
			unfollowBatch(ids: $ids)
		}
	}
`);
