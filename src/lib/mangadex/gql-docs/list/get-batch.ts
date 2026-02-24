import { graphql } from "@mangadex/gql/gql";

export const getCustomListInfoByBatchGQLDoc = graphql(`
	query getCustomListInfoByBatch($ids: [UUID!]!, $private: Boolean) {
		customList {
			getCustomListBatch(ids: $ids, private: $private) {
				id
				attributes {
					name
					visibility
				}
				relationships {
					titlesIds
				}
			}
		}
	}
`);
