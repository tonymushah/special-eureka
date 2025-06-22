import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { queryStore } from "@urql/svelte";

export const authCheck = graphql(`
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

export const authCheckStore = queryStore({
	client,
	query: authCheck
});
