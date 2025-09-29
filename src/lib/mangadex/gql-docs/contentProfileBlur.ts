import { graphql } from "@mangadex/gql/gql";

export const gql_mutation = graphql(`
	mutation setContentProfileBlur($blur: Boolean!) {
		userOption {
			setContentProfileBlur(blur: $blur)
		}
	}
`);

export const gql_subscription = graphql(`
	subscription subContentProfileBlur {
		watchContentProfileBlur
	}
`);

export const gql_query = graphql(`
	query getContentProfileBlur {
		userOption {
			getContentProfileBlur
		}
	}
`);
