import { graphql } from "@mangadex/gql";

const query = graphql(`
	query scanalationGroupSearch($params: ScanlationGroupListParams!) {
		scanlationGroup {
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
						leader {
							id
							attributes {
								username
							}
						}
						members {
							id
						}
					}
				}
			}
		}
	}
`);

export default query;