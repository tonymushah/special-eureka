import { graphql } from "@mangadex/gql";
import type { ReadingStatus } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { readable, type Readable } from "svelte/store";

const subscription = graphql(`
	subscription mangaReadingStatusSubscription($id: UUID!) {
		watchMangaReadingState(mangaId: $id)
	}
`);

const init_query = graphql(`
	query mangaReadingStatusQuery($id: UUID!) {
		manga {
			readingStatus(id: $id)
		}
	}
`);

const mutation = graphql(`
	mutation mangaReadingStatusMutation($id: UUID!, $status: ReadingStatus) {
		manga {
			updateReadingStatus(id: $id, status: $status)
		}
	}
`);

export async function get_manga_reading_status(id: string): Promise<ReadingStatus | null> {
	const res = await client
		.query(init_query, {
			id
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.manga.readingStatus ?? null;
	} else {
		throw new Error("no result");
	}
}

export async function set_manga_reading_status(id: string, status: ReadingStatus | null) {
	const res = await client
		.mutation(mutation, {
			id,
			status
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
	return res.data?.manga.updateReadingStatus;
}

export type MangaReadingStatusOption = {
	getOnMount?: boolean;
	onGetError?: (e: unknown) => void;
	initValue?: ReadingStatus | null;
};

export default function manga_reading_status(
	id: string,
	options: MangaReadingStatusOption = {
		getOnMount: true
	}
): Readable<ReadingStatus | null> {
	return readable<ReadingStatus | null>(options.initValue ?? null, (set) => {
		const sub = client
			.subscription(subscription, {
				id
			})
			.subscribe((res) => {
				const status = res.data?.watchMangaReadingState;
				set(status ?? null);
			});
		if (options.getOnMount)
			get_manga_reading_status(id).catch(options.onGetError ?? console.error);
		return () => {
			sub.unsubscribe();
		};
	});
}
