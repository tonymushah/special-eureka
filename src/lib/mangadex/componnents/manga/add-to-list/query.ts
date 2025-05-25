import { graphql } from "@mangadex/gql";

const getUserLoggedCustomListsQuery = graphql(`
	query getUserLoggedCustomLists($offset: Int, $limit: Int) {
		customList {
			currentLoggedLists(params: { limit: $limit, offset: $offset }) {
				data {
					id
					attributes {
						name
						visibility
					}
					relationships {
						titlesIds
					}
				}
				limit
				offset
				total
			}
		}
	}
`);

export default getUserLoggedCustomListsQuery;
