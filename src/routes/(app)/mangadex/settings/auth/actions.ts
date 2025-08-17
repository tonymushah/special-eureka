import { loginMutation, logoutMutation } from "@mangadex/gql-docs/auth";
import { client } from "@mangadex/gql/urql";

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

export { loginMutation, logoutMutation };
