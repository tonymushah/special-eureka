import { graphql } from "@mangadex/gql/gql";

export const gql_mutation = graphql(`
	mutation setForcePort443($force: Boolean!) {
		userOption {
			setForcePort443(force: $force)
		}
	}
`);

export const gql_subscription = graphql(`
	subscription subForce443 {
		watchForcePort443
	}
`);