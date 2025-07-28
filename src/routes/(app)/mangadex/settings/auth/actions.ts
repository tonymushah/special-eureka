import { graphql } from "@mangadex/gql/exports";
import { client } from "@mangadex/gql/urql";

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

export async function login(username: string, password: string) {
	const res = await client
		.mutation(loginMutation, {
			username,
			password
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

export async function logout() {
	const res = await client.mutation(logoutMutation, {}).toPromise();
	if (res.error) {
		throw res.error;
	}
}
