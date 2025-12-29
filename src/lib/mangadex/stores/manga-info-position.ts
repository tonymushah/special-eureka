import {
	mangaInfoPositionGQLDoc,
	setMangaInfoPositionGQLDoc
} from "@mangadex/gql-docs/manga-info-position";
import { MangaInfosPositions } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
import { get, readable, type Writable } from "svelte/store";

async function setMangaInfoPosition(position: MangaInfosPositions) {
	const res = await client
		.mutation(setMangaInfoPositionGQLDoc, {
			position
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

const mipReadable = readable(MangaInfosPositions.Left, (set) => {
	let unsub: (() => void) | undefined = undefined;
	const timeout = delay(() => {
		const sub = client.subscription(mangaInfoPositionGQLDoc, {}).subscribe((res) => {
			if (res.data) {
				set(res.data.watchMangaInfosPosition);
			} else if (res.error) {
				console.error(res.error);
			}
		});
		unsub = () => {
			sub.unsubscribe();
		};
	}, 1);
	return () => {
		clearTimeout(timeout);
		unsub?.();
	};
});

export const mangaInfoPosition: Writable<MangaInfosPositions> = {
	subscribe: mipReadable.subscribe,
	set(val) {
		setMangaInfoPosition(val).catch(console.error);
	},
	update(updater) {
		const val = updater(get(mipReadable));
		setMangaInfoPosition(val).catch(console.error);
	}
};
