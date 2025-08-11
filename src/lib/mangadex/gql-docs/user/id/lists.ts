import { graphql } from "@mangadex/gql/exports";

const query = graphql(`
	query userCustomLists($params: UserCustomListParams!) {
		customList {
			getUserLists(params: $params) {
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