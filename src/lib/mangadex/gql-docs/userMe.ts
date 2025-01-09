import { graphql } from "@mangadex/gql";

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
