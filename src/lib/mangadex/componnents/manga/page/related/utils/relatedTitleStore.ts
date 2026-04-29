// [x] refactor to svelte map
import type { MangaStatus } from "@mangadex/gql/graphql";
import { Context } from "runed";
import { SvelteMap } from "svelte/reactivity";

export type RelatedTitle = {
	id: string;
	coverArtAlt: string;
	title: string;
	description: string;
	status: MangaStatus;
};

export class RelatedTitlesStore extends SvelteMap<string, RelatedTitle> {
	addTitle(title: RelatedTitle) {
		this.set(title.id, title);
	}
	addTitles(titles: RelatedTitle[]) {
		titles.forEach((title) => this.addTitle(title));
	}
	deleteAll(ids: string[]) {
		ids.forEach((id) => this.delete(id));
	}
}

export default function relatedTitlesStore(): RelatedTitlesStore {
	return new RelatedTitlesStore();
}

const KEY = "mangadex-title-page-related-titles";

const ctx = new Context<RelatedTitlesStore>(KEY);

export function setRelatedTitlesStoreContext(store: RelatedTitlesStore): RelatedTitlesStore {
	return ctx.set(store);
}

export function initRelatedTitlesStoreContext(): RelatedTitlesStore {
	return setRelatedTitlesStoreContext(relatedTitlesStore());
}

export function getRelatedTitlesStoreContext(): RelatedTitlesStore {
	return ctx.getOr(relatedTitlesStore());
}
