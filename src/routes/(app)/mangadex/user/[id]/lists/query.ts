import { graphql } from "@mangadex/gql/exports";

export const query = graphql(`
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
