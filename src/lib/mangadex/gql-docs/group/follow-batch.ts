import { graphql } from "@mangadex/gql/gql";

export const followGroupBatchGQLDoc = graphql(`
	mutation followScanlationGroupBatch($ids: [UUID!]!) {
		scanlationGroup {
			followBatch(ids: $ids)
		}
	}
`);

export const unfollowGroupBatchGQLDoc = graphql(`
	mutation unfollowScanlationGroupBatch($ids: [UUID!]!) {
		scanlationGroup {
			unfollowBatch(ids: $ids)
		}
	}
`);
