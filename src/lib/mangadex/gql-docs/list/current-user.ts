import { graphql } from "@mangadex/gql";

const query = graphql(`
	query currentUserCustomLists($params: CurrentLoggedLists!) {
		customList {
			currentLoggedLists(params: $params) {
				limit
				offset
				total
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
			}
		}
	}
`);

export default query;