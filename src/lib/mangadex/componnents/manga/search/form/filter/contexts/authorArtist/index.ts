import { generateContextMethods, generateContextStoresMethods } from "@mangadex/utils/contexts";
import type { Tag } from "@melt-ui/svelte";
import { derived, type Readable, type Writable } from "svelte/store";

export type AuthorArtistOptions = {
	authors: Tag[];
	artists: Tag[];
};

export function defaultAuthorArtistOptions(): AuthorArtistOptions {
	return {
		artists: [],
		authors: []
	};
}

export const {
	init: initMangaSearchAuthorArtistsOptions,
	getReadonly: getMangaSearchAuthorArtistsOptions,
	get: getMangaSearchAuthorArtistsOptionsWritable
} = generateContextStoresMethods<AuthorArtistOptions>("MANGA_SEARCH_AUTHOR_ARTISTS_OPTIONS");

export function getMangaSearchAuthorsOptions(): Readable<Tag[]> {
	return derived(getMangaSearchAuthorArtistsOptions(), ($o) => $o.authors);
}

export function getMangaSearchArtistsOptions(): Readable<Tag[]> {
	return derived(getMangaSearchAuthorArtistsOptions(), ($o) => $o.artists);
}

export function getMangaSearchAuthorsOptionsWritable(): Writable<Tag[]> {
	const opts_writable = getMangaSearchAuthorArtistsOptionsWritable();
	const authors = derived(opts_writable, ($o) => $o.authors);
	return {
		subscribe(run, invalidate) {
			return authors.subscribe(run, invalidate);
		},
		set(value) {
			opts_writable.update((opts) => {
				opts.authors = value;
				return opts;
			});
		},
		update(updater) {
			opts_writable.update((opts) => {
				opts.authors = updater(opts.authors);
				return opts;
			});
		}
	};
}

export function getMangaSearchArtistsOptionsWritable(): Writable<Tag[]> {
	const opts_writable = getMangaSearchAuthorArtistsOptionsWritable();
	const artists = derived(opts_writable, ($o) => $o.artists);
	return {
		subscribe(run, invalidate) {
			return artists.subscribe(run, invalidate);
		},
		set(value) {
			opts_writable.update((opts) => {
				opts.artists = value;
				return opts;
			});
		},
		update(updater) {
			opts_writable.update((opts) => {
				opts.artists = updater(opts.artists);
				return opts;
			});
		}
	};
}

export interface AuthorSearchFetcherResultData {
	data: Tag[];
	hasNext: () => boolean;
	next: () => Promise<AuthorSearchFetcherResultData>;
}

export type AuthorSearchFetcher = (name: string) => Promise<AuthorSearchFetcherResultData>;

export const { init: initMangaSearchAuthorSearchFetcher, get: getMangaSearchAuthorSearchFetcher } =
	generateContextMethods<AuthorSearchFetcher>("MANGA_SEARCH_AUTHOR_S_FETCH");

/**
 * A `naive` implementation for `AuthorSearchFetcherResultData` interface
 */
export class NaiveAuthorSearchFetcherResultData implements AuthorSearchFetcherResultData {
	constructor(data: Tag[]) {
		this.data = data;
	}
	data: Tag[];
	hasNext() {
		return false;
	}
	async next(): Promise<AuthorSearchFetcherResultData> {
		throw new Error(
			"`hasNext` already told you that there is no next data available anymore! Are you a moron?"
		);
	}
}
