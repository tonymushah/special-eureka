import { graphql } from "@mangadex/gql/exports";

export const serverIconStateQuery = graphql(/* GraphQL */ `
	subscription serverIconState {
		watchIsAppMounted
	}
`);
