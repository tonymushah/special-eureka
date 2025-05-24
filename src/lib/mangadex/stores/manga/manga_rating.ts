import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { readable, type Readable } from "svelte/store";

const subscription = graphql(`
	subscription mangaRatingSubscription($id: UUID!) {
		watchRating(mangaId: $id) {
			rating
		}
	}
`);

const query = graphql(`
	query getMangaRating($id: UUID!) {
		rating {
			lists(mangaIds: [$id]) {
				rating
			}
		}
	}
`);

const updateCreateMutation = graphql(`
	mutation updateMangaRating($id: UUID!, $rating: Int!) {
		rating {
			createUpdate(params: { mangaId: $id, rating: $rating })
		}
	}
`);

const deleteMutation = graphql(`
	mutation deleteMangaRating($id: UUID!) {
		rating {
			delete(id: $id)
		}
	}
`);

export async function get_manga_rating(manga_id: string): Promise<number | null> {
	const res = await client
		.query(query, {
			id: manga_id
		})
		.toPromise();
	if (res.data) {
		return res.data.rating.lists[0]?.rating ?? null;
	} else if (res.error) {
		throw res.error;
	} else {
		throw new Error("no data?");
	}
}

export async function create_or_update_manga_rating(manga_id: string, rating: number) {
	const res = await client
		.mutation(updateCreateMutation, {
			id: manga_id,
			rating
		})
		.toPromise();
	if (res.data) {
		return;
	} else if (res.error) {
		throw res.error;
	} else {
		throw new Error("no data?");
	}
}

export async function delete_manga_rating(manga_id: string) {
	const res = await client
		.mutation(deleteMutation, {
			id: manga_id
		})
		.toPromise();
	if (res.data) {
		return;
	} else if (res.error) {
		throw res.error;
	} else {
		throw new Error("no data?");
	}
}

export async function set_manga_rating(manga_id: string, rating: number | null) {
	if (rating) {
		await create_or_update_manga_rating(manga_id, rating);
	} else {
		await delete_manga_rating(manga_id);
	}
}

export type MangaRatingOption = {
	getOnMount?: boolean;
	onGetError?: (e: unknown) => void;
	initValue?: boolean;
};

export default function manga_rating(
	manga_id: string,
	option: MangaRatingOption = {
		getOnMount: true
	}
): Readable<number | null> {
	return readable<number | null>(null, (set) => {
		const sub = client
			.subscription(subscription, {
				id: manga_id
			})
			.subscribe((e) => {
				if (e.data) {
					set(e.data.watchRating.rating ?? null);
				} else if (e.error) {
					console.error(e.error);
				}
			});
		if (option.getOnMount)
			get_manga_rating(manga_id)
				.then((e) => set(e))
				.catch(option.onGetError ?? console.error);
		return () => {
			sub.unsubscribe();
		};
	});
}
