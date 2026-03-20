import { unblockBatchUserGQLDoc, unblockUserGQLDoc } from "@mangadex/gql-docs/blacklist/users";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function unblockOneUser(user: string) {
	const res = await client
		.mutation(unblockUserGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.users.unblockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function unblockManyUser(users: string[]) {
	const res = await client
		.mutation(unblockBatchUserGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.users.unblockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createUnblockUserMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "user"],
		mutationFn: unblockOneUser
	}));
}

export function createUnblockUserBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "user", "batch"],
		mutationFn: unblockManyUser
	}));
}
