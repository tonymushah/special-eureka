import type { ReadonlyValue } from "$lib";
import type { Getter } from "runed";
import getMangaToReadChapter from "./getMangaToReadChapter";

export function hasChapterToRead(mangaId: Getter<string>): ReadonlyValue<boolean> {
	let hasRead = $state(false);
	let manga_id = $derived.by(mangaId);
	$effect.pre(() => {
		getMangaToReadChapter(manga_id).then((e) => {
			hasRead = e.length != 0;
		});
	});

	return {
		get value() {
			return hasRead;
		}
	};
}
