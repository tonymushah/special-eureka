import { graphql } from "@mangadex/gql/exports";

export const userMeOnSidebarFooterQuery = graphql(/* GraphQL */ `
	query userMeOnSidebarFooter {
		user {
			me {
				id
				attributes {
					username
					roles
				}
			}
		}
	}
`);
