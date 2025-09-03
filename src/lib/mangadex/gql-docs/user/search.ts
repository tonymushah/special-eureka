import { graphql } from "@mangadex/gql/exports";

const query = graphql(`
	query userSearch($params: UserListParam!) {
		user {
			list(params: $params) {
				limit
				offset
				total
				data {
					id
					attributes {
						username
						roles
					}
				}
			}
		}
	}
`);

export default query;
