// [x] refactor to svelte map and remove store
import type { Props as ChapterElement1Props } from "@mangadex/componnents/chapter/base/element1/ChapterElement1.svelte";
import { Context } from "runed";
import { SvelteMap } from "svelte/reactivity";

type Chapter = ChapterElement1Props;

type SetCommentsEntry = {
	id: string;
	comments: number;
};

export class ChapterStores extends SvelteMap<string, Chapter> {
	add(value: Chapter) {
		this.set(value.id, value);
	}
	remove(id: string) {
		this.delete(id);
	}
	addByBatch(value: Chapter[]) {
		value.forEach((v) => this.add(v));
	}
	setComment(id: string, comments: number) {
		let chapter_data = this.get(id);
		if (chapter_data) {
			chapter_data.comments = comments;
		}
	}
	setComments(input: SetCommentsEntry[]) {
		input.forEach((i) => this.setComment(i.id, i.comments));
	}
	isPresents(ids: string[]): boolean {
		return ids.every((id) => this.has(id));
	}
	isPresent(id: string): boolean {
		return this.has(id);
	}
}

export default function chapterStores(): ChapterStores {
	return new ChapterStores();
}

const KEY = "mangadex-title-page-chapters";

const ctx = new Context<ChapterStores>(KEY);

export function setChapterStoreContext(store: ChapterStores): ChapterStores {
	return ctx.set(store);
}

export function initChapterStoreContext(): ChapterStores {
	return setChapterStoreContext(chapterStores());
}

export function getChapterStoreContext(): ChapterStores {
	return ctx.getOr(chapterStores());
}
