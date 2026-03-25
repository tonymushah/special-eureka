import { blockBatchUserGQLDoc, blockUserGQLDoc } from "@mangadex/gql-docs/blacklist/users";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function blockOneUser(user: string) {
	const res = await client
		.mutation(blockUserGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.users.blockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function blockManyUser(users: string[]) {
	const res = await client
		.mutation(blockBatchUserGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.users.blockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createBlockUserMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "user"],
		mutationFn: blockOneUser
	}));
}

export function createBlockUserBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "user", "batch"],
		mutationFn: blockManyUser
	}));
}
