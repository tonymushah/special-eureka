import { graphql } from "@mangadex/gql";

const customListPageQuery = graphql(`
	query customlistPageQuery($id: UUID!) {
		customList {
			get(id: $id) {
				id
				attributes {
					name
					visibility
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
`);

export default customListPageQuery