import { graphql } from "@mangadex/gql";

export const authCheckGQLQuery = graphql(`
	query authCheck {
		auth {
			check {
				isAuthenticated
				roles
				permissions
			}
		}
	}
`);
