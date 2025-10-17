import { graphql } from "@mangadex/gql/gql";

export const userFollowedUsersGQL = graphql(`
	query userFollowedUsers($offset: Int, $limit: Int) {
		follows {
			users(param:  {
			   limit: $limit
			   offset: $offset
			}) {
				data {
					id
					attributes {
						username
						roles
					}
					relationships {
						groups {
							id
						}
					}
				}
				limit
				offset
				total
			}
		}
	}
`);
