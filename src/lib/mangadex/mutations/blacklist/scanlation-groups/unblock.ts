import {
	unblockBatchScanlationGroupGQLDoc,
	unblockScanlationGroupGQLDoc
} from "@mangadex/gql-docs/blacklist/scanlation-groups";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function unblockOneScanlationGroup(user: string) {
	const res = await client
		.mutation(unblockScanlationGroupGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.scanlationGroups.unblockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function unblockManyScanlationGroup(users: string[]) {
	const res = await client
		.mutation(unblockBatchScanlationGroupGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.scanlationGroups.unblockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createUnblockScanlationGroupMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "scanlation-group"],
		mutationFn: unblockOneScanlationGroup
	}));
}

export function createUnblockScanlationGroupBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "scanlation-group", "batch"],
		mutationFn: unblockManyScanlationGroup
	}));
}
