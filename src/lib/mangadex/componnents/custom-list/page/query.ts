import { graphql } from "@mangadex/gql";

const customListPageQuery = graphql(`
	query customlistPageQuery($id: UUID!, $private: Boolean) {
		customList {
			get(id: $id, private: $private) {
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