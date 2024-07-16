import { ReadingMode } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import { derived } from "svelte/store";

export const {
	getReadonly: getCurrentChapterReadingMode,
	get: getCurrentChapterReadingModeWritable,
	init: initCurrentChapterReadingMode
} = generateContextStoresMethods<ReadingMode>("CURRENT_CHAPTER_READING_MODE");

export function isDoublePage() {
	return derived(getCurrentChapterReadingMode(), ($mode) => $mode == ReadingMode.DoublePage);
}

export function isSinglePage() {
	return derived(getCurrentChapterReadingMode(), ($mode) => $mode == ReadingMode.SinglePage);
}

export function isLongStrip() {
	return derived(getCurrentChapterReadingMode(), ($mode) => $mode == ReadingMode.LongStrip);
}

export function isWideStrip() {
	return derived(getCurrentChapterReadingMode(), ($mode) => $mode == ReadingMode.WideStrip);
}

export function isStripReadingMode() {
	return derived([isWideStrip(), isLongStrip()], ([$isWide, $isLong]) => $isLong || $isWide);
}
export function isOnZoomableImage() {
	return derived(
		[isSinglePage(), isDoublePage()],
		([$isSingle, $isDouble]) => $isDouble || $isSingle
	);
}

export function isReadingDirectionModifiable() {
	return derived(
		[isOnZoomableImage(), isWideStrip()],
		([isZoomable, isWide]) => isZoomable || isWide
	);
}
