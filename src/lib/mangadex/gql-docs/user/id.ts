import { graphql } from "@mangadex/gql";

const query = graphql(`
	query userPageQuery($id: UUID!) {
		user {
			get(id: $id) {
				id
				attributes {
					username
					roles
				}
				relationships {
					groups {
						id
						attributes {
							name
						}
						relationships {
							leader {
								id
							}
						}
					}
				}
			}
		}
		chapter {
			list(params: { uploaders: [$id] }) {
				total
			}
		}
	}
`);

export default query;