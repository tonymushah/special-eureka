import type { Props as ChapterElement1Props } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
import type { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import { setContext, type ComponentProps, getContext } from "svelte";
import { writable, type Readable } from "svelte/store";

type Chapter = ChapterElement1Props;

export type ChapterMap = Map<string, Chapter>;

type SetCommentsEntry = {
	id: string,
	comments: number
}

export type ChapterStores = Readable<ChapterMap> & {
	add: (value: Chapter) => void,
	remove: (id: string) => void,
	clear: () => void,
	get: () => ChapterMap
	addByBatch: (value: Chapter[]) => void;
	setComment: (id: string, comments: number) => void;
	setComments: (input: SetCommentsEntry[]) => void;
}

export default function chapterStores(): ChapterStores {
	const init = new Map<string, Chapter>();
	const store = writable(init);
	return {
		subscribe(run, invalidate) {
			return store.subscribe(run, invalidate)
		},
		add(value: Chapter) {
			store.update((u) => {
				u.set(value.id, value);
				return u
			})
		},
		get() {
			return init;
		},
		addByBatch(value: Chapter[]) {
			store.update((u) => {
				value.forEach((v) => {
					u.set(v.id, v);
				})
				return u
			})
		},
		remove(id: string) {
			store.update((u) => {
				u.delete(id);
				return u
			})
		},
		clear() {
			store.update((u) => {
				u.clear();
				return u
			})
		},
		setComment(id, comments) {
			store.update((u) => {
				const chapter = u.get(id);
				if (chapter) {
					chapter.comments = comments;
				}
				return u;
			})
		},
		setComments(input) {
			store.update((u) => {
				input.forEach(({ id, comments }) => {
					const chapter = u.get(id);
					if (chapter) {
						chapter.comments = comments;
					}
				})
				return u;
			})
		},
	}
}

const KEY = "mangadex-title-page-chapters";

export function setChapterStoreContext(store: ChapterStores): ChapterStores {
	return setContext(KEY, store);
}

export function initChapterStoreContext(): ChapterStores {
	return setChapterStoreContext(chapterStores());
}

export function getChapterStoreContext(): ChapterStores {
	const context = getContext<ChapterStores>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} context is missing`);
	}
}