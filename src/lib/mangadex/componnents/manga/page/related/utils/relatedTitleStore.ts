import type { MangaStatus } from "@mangadex/gql/graphql";
import { getContext, setContext } from "svelte";
import { type Readable, writable } from "svelte/store";

export type RelatedTitle = {
	id: string;
	coverArt: Readable<string | undefined>;
	coverArtAlt: string;
	title: string;
	description: string;
	status: MangaStatus;
};

export type RelatedTitles = Map<string, RelatedTitle>;

export type RelatedTitlesStore = Readable<RelatedTitles> & {
	addTitle: (title: RelatedTitle) => void;
	addTitles: (titles: RelatedTitle[]) => void;
	delete: (id: string) => void;
	deleteAll: (ids: string[]) => void;
	get: () => RelatedTitles;
	clear: () => void;
};

export default function relatedTitlesStore(): RelatedTitlesStore {
	const init = new Map<string, RelatedTitle>();
	const store = writable(init);
	return {
		subscribe(run, invalidate) {
			return store.subscribe(run, invalidate);
		},
		addTitle(title) {
			store.update((v) => {
				v.set(title.id, title);
				return v;
			});
		},
		addTitles(titles) {
			store.update((v) => {
				titles.forEach((title) => {
					v.set(title.id, title);
				});
				return v;
			});
		},
		delete(id) {
			store.update((v) => {
				v.delete(id);
				return v;
			});
		},
		deleteAll(ids) {
			store.update((v) => {
				ids.forEach((id) => {
					v.delete(id);
				});
				return v;
			});
		},
		get() {
			return init;
		},
		clear() {
			store.update((v) => {
				v.clear();
				return v;
			});
		}
	};
}

const KEY = "mangadex-title-page-related-titles";

export function setRelatedTitlesStoreContext(store: RelatedTitlesStore): RelatedTitlesStore {
	return setContext(KEY, store);
}

export function initRelatedTitlesStoreContext(): RelatedTitlesStore {
	return setRelatedTitlesStoreContext(relatedTitlesStore());
}

export function getRelatedTitlesStoreContext(): RelatedTitlesStore {
	const context = getContext<RelatedTitlesStore>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} context is not defined`);
	}
}
