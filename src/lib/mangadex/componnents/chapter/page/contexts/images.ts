import { getContext, setContext } from "svelte";
import { readable, readonly, writable, type Readable, type Writable } from "svelte/store";

type ChapterImagesList = Array<string>;

const KEY = "chapter-page-images";

export function initChapterImageContext(): Writable<ChapterImagesList> {
	return setContext<Writable<ChapterImagesList>>(KEY, writable([]));
}

export function getChapterImageContextWritable(): Writable<ChapterImagesList> {
	const context = getContext<Writable<ChapterImagesList> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}

export function getChapterImageContext(): Readable<ChapterImagesList> {
	return readonly(getChapterImageContextWritable());
}
