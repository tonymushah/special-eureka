import {
	unblockAuthorArtistGQLDoc,
	unblockBatchAuthorArtistGQLDoc
} from "@mangadex/gql-docs/blacklist/author-artists";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export async function unblockOneAuthorArtist(user: string) {
	const res = await client
		.mutation(unblockAuthorArtistGQLDoc, {
			id: user
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.authorArtists.unblockOne;
	} else {
		throw new Error("nothing mutated??");
	}
}

export async function unblockManyAuthorArtist(users: string[]) {
	const res = await client
		.mutation(unblockBatchAuthorArtistGQLDoc, {
			ids: users
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.blacklist.authorArtists.unblockMany;
	} else {
		throw new Error("nothing mutated??");
	}
}

export function createUnblockAuthorArtistsMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "author-artist"],
		mutationFn: unblockOneAuthorArtist
	}));
}

export function createUnblockAuthorArtisBatchMutation() {
	return createMutation(() => ({
		mutationKey: ["unblock", "author-artists", "batch"],
		mutationFn: unblockManyAuthorArtist
	}));
}
