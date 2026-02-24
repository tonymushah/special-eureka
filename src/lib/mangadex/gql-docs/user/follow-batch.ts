import { graphql } from "@mangadex/gql/gql";

export const followUserBatchGQLDoc = graphql(`
	mutation followUserBatch($ids: [UUID!]!) {
		user {
			followBatch(ids: $ids)
		}
	}
`);

export const unfollowUserBatchGQLDoc = graphql(`
	mutation unfollowUserBatch($ids: [UUID!]!) {
		user {
			unfollowBatch(ids: $ids)
		}
	}
`);
