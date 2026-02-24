import { graphql } from "@mangadex/gql/gql";

export const getUsersInfoGQLDoc = graphql(`
	query getUsersInfo($ids: [UUID!]!) {
		user {
			list(params: { userIds: $ids }) {
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
