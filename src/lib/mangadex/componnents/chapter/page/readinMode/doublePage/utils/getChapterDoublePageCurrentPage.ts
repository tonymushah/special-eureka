import { derived, type Readable } from "svelte/store";
import { currentChapterPage } from "../../../stores/currentPage";
import type { ChapterDoublePageImage } from "./getChapterImagesAsDoublePage";
import getChapterDoublePageCurrentPageIndex from "./getChapterDoublePageCurrentPageIndex";
import getChapterImagesAsDoublePage from "./getChapterImagesAsDoublePage";

export default function getChapterDoublePageCurrentPage(
	currentChapter = currentChapterPage
): Readable<ChapterDoublePageImage | undefined> {
	const images = getChapterImagesAsDoublePage();
	const current = getChapterDoublePageCurrentPageIndex(currentChapter);
	return derived([images, current], ([$images, $currentPage]) => {
		return $images.at($currentPage);
	});
}
