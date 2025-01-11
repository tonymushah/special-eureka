import { graphql } from "@mangadex/gql/exports";

export const userMeSubDoc = graphql(`
	subscription userMe {
		watchUserMe {
			username
			roles
		}
	}
`);

export const isLoggedSubDoc = graphql(`
	subscription isLogged {
		watchIsLogged
	}
`);
