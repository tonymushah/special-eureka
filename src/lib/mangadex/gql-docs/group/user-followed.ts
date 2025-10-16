import { graphql } from "@mangadex/gql/gql";

export const userFollowedGroupsGQL = graphql(`
	query userFollowedGroups($offset: Int, $limit: Int) {
		follows {
			groups(params:  {
			   limit: $limit
			   offset: $offset
			}) {
				data {
					id
					attributes {
						name
						altNames
						discord
						ircServer
						ircChannel
						official
						verified
						website
						twitter
						mangaUpdates
						contactEmail
					}
					relationships {
						leader {
							id
							attributes {
								username
								roles
							}
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
