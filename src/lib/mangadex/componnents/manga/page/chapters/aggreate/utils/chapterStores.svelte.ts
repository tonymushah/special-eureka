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
	add(_value: Chapter) {
		let value = $state(_value);
		this.set(_value.id, value);
	}
	remove(id: string) {
		this.delete(id);
	}
	addByBatch(value: Chapter[]) {
		value.forEach((v) => this.add(v));
	}
	setComment(id: string, comments: number) {
		console.debug(`setting comment ${id} => ${comments}`);
		let chapter_data = this.get(id);
		if (chapter_data) {
			chapter_data.comments = comments;
			this.set(id, chapter_data);
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

export function setChapterStoreContext(_store: ChapterStores): ChapterStores {
	let store = $state(_store);
	return ctx.set(store);
}

export function initChapterStoreContext(): ChapterStores {
	return setChapterStoreContext(chapterStores());
}

export function getChapterStoreContext(): ChapterStores {
	return ctx.getOr(chapterStores());
}
