import { derived, type Readable } from "svelte/store";
import getCurrentChapterImages from "../../../utils/getCurrentChapterImages";
import type { DoublePageIndex } from "@mangadex/stores/chapter/pages";

export default function getChapterDoublePageIndexes(): Readable<DoublePageIndex[]> {
	return derived(getCurrentChapterImages(), (images) => images.pagesAsDoublePageIndexes());
}
