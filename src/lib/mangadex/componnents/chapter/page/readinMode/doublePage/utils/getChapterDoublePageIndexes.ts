import type { ReadonlyValue } from "$lib";
import type { DoublePageIndex } from "@mangadex/stores/chapter/pages.svelte";
import getCurrentChapterImages from "../../../utils/getCurrentChapterImages";

export default function getChapterDoublePageIndexes(): ReadonlyValue<DoublePageIndex[]> {
	const images = getCurrentChapterImages();
	return {
		get value() {
			return images.pagesAsDoublePageIndexes;
		}
	};
}
