import { graphql } from "@mangadex/gql/gql";

export const downloadCoversLocalyGQLDoc = graphql(`
	mutation downloadCoversLocaly($ids: [UUID!]!) {
		cover {
			downloadCovers(ids: $ids)
		}
	}
`);
