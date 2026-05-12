import { graphql } from "@mangadex/gql";

const query = graphql(`
	query authorsSearch($params: AuthorListParams!) {
		author {
			list(params: $params) {
				limit
				offset
				total
				data {
					id
					attributes {
						name
					}
					relationships {
						works {
							id
						}
					}
				}
			}
		}
	}
`);

export default query;