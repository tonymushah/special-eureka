import {
	blockBatchScanlationGroupGQLDoc,
	blockScanlationGroupGQLDoc
} from "@mangadex/gql-docs/blacklist/scanlation-groups";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function blockOneScanlationGroups(user: string) {
	const res = await client
		.mutation(blockScanlationGroupGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.scanlationGroups.blockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function blockManyScanlationGroups(users: string[]) {
	const res = await client
		.mutation(blockBatchScanlationGroupGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.scanlationGroups.blockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createBlockScanlationGroupMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "scanlation-group"],
		mutationFn: blockOneScanlationGroups
	}));
}

export function createBlockScanlationGroupBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "scanlation-group", "batch"],
		mutationFn: blockManyScanlationGroups
	}));
}
