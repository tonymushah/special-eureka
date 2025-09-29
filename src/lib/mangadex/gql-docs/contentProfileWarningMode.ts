import { graphql } from "@mangadex/gql/gql";

export const gql_mutation = graphql(`
	mutation setContentProfileWarningMode($mode: ContentProfileWarningMode!) {
		userOption {
			setContentProfileWarningMode(mode: $mode)
		}
	}
`);

export const gql_query = graphql(`
	query getContentProfileWarningMode {
		userOption {
			getContentProfileWarningMode
		}
	}
`);

export const gql_subscription = graphql(`
	subscription subContentProfileWarningMode {
		watchContentProfileWarningMode
	}
`);
