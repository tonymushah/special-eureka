import { derived, type Readable } from "svelte/store";
import { currentChapterPage } from "../../../stores/currentPage";
import type { ChapterDoublePageImage } from "./getChapterImagesAsDoublePage";
import getChapterDoublePageCurrentPageIndex from "./getChapterDoublePageCurrentPageIndex";
import getChapterImagesAsDoublePage from "./getChapterImagesAsDoublePage";
import { ReadingDirection, readingDirection } from "../../../stores/readingDirection";
import { isArray } from "lodash";

export default function getChapterDoublePageCurrentPage(
	currentChapter = currentChapterPage
): Readable<ChapterDoublePageImage | undefined> {
	const images = getChapterImagesAsDoublePage();
	const current = getChapterDoublePageCurrentPageIndex(currentChapter);
	return derived([images, current, readingDirection], ([$images, $currentPage, $rd]) => {
		const image = $images.at($currentPage);
		if (image) {
			if (isArray(image)) {
				if ($rd == ReadingDirection.Ltr) {
					return image;
				} else {
					return [image[1], image[0]] satisfies ChapterDoublePageImage;
				}
			} else {
				return image;
			}
		}
	});
}
