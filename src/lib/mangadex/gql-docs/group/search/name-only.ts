import { graphql } from "@mangadex/gql";

export const groupSearchAndGetNameOnly = graphql(`
	query groupSearchAndGetNameOnly($limit: Int, $offset: Int, $name: String) {
		scanlationGroup {
			list(params: { limit: $limit, offset: $offset, name: $name }) {
				data {
					id
					attributes {
						name
					}
				}
				limit
				offset
				total
			}
		}
	}
`);
