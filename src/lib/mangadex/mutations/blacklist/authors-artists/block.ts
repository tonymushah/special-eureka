import {
	blockAuthorArtistGQLDoc,
	blockBatchAuthorArtistGQLDoc
} from "@mangadex/gql-docs/blacklist/author-artists";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function blockOneAuthorArtist(user: string) {
	const res = await client
		.mutation(blockAuthorArtistGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.authorArtists.blockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function blockManyAuthorArtist(users: string[]) {
	const res = await client
		.mutation(blockBatchAuthorArtistGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.authorArtists.blockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createBlockAuthorArtistMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "author-artist"],
		mutationFn: blockOneAuthorArtist
	}));
}

export function createBlockAuthorArtistBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["block", "author-artist", "batch"],
		mutationFn: blockManyAuthorArtist
	}));
}
