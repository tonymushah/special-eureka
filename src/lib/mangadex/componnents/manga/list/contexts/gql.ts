import { graphql } from "@mangadex/gql/exports";
import { MangaListStyle } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { get, readable, type Writable } from "svelte/store";

export const mutation = graphql(`
	mutation mangaListMutation($style: MangaListStyle!) {
		userOption {
			setMangaListStyle(mangaListStyle: $style)
		}
	}
`);

export const subscription = graphql(`
	subscription mangaListStyleSub {
		watchMangaListStyle
	}
`);

const subReadable = readable(MangaListStyle.Grid, (set) => {
	const sub = client.subscription(subscription, {}).subscribe((v) => {
		const data = v.data?.watchMangaListStyle;
		if (data) {
			set(data);
		}
	});
	return () => {
		sub.unsubscribe();
	};
});

async function setMangaListStyle(style: MangaListStyle): Promise<void> {
	const res = await client
		.mutation(mutation, {
			style
		})
		.toPromise();
	if (res.error) {
		throw res.error;
	}
}

const mangaListStyleStore: Writable<MangaListStyle> = {
	subscribe(run, invalidate) {
		return subReadable.subscribe(run, invalidate);
	},
	set(value) {
		setMangaListStyle(value).catch(console.error);
	},
	update(updater) {
		setMangaListStyle(updater(get(subReadable))).catch(console.error);
	}
};

export default mangaListStyleStore;
