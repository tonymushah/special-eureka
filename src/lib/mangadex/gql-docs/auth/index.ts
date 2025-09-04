import { graphql } from "@mangadex/gql";

export const loginMutation = graphql(`
	mutation loginMutation($username: Username!, $password: Password!) {
		oauth {
			login(password: $password, username: $username)
		}
	}
`);

export const logoutMutation = graphql(`
	mutation logoutMutation {
		oauth {
			logout
		}
	}
`);
