import { ReadingMode } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import { derived } from "svelte/store";

export const {
	getReadonly: getCurrentChapterReadingMode,
	get: getCurrentChapterReadingModeWritable,
	init: initCurrentChapterReadingMode
} = generateContextStoresMethods<ReadingMode>("CURRENT_CHAPTER_READING_MODE");

export function isOnZoomableImage() {
	return derived(
		getCurrentChapterReadingMode(),
		($mode) => $mode == ReadingMode.DoublePage || $mode == ReadingMode.SinglePage
	);
}
