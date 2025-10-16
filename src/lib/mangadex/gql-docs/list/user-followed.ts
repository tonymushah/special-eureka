import { graphql } from "@mangadex/gql/gql";

export const userFollowedCustomListsGQL = graphql(`
	query userFollowedCustomLists($limit: Int, $offset: Int) {
		follows {
			customLists(param:  {
			   limit: $limit
			   offset: $offset
			}) {
				limit
				offset
				total
				data {
					id
					attributes {
						name
					}
					relationships {
						titlesIds
						user {
							id
							attributes {
								username
								roles 
							}
						}
					}
				}
			}
		}
	}
`);
