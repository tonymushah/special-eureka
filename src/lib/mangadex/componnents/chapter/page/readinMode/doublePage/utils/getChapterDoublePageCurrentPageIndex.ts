import { derived, type Readable } from "svelte/store";
import getChapterImagesAsDoublePage from "./getChapterImagesAsDoublePage";
import { currentChapterPage } from "../../../stores/currentPage";
import lodash, { isArray } from "lodash";
import getChapterDoublePageIndexes from "./getChapterDoublePageIndexes";

export default function getChapterDoublePageCurrentPageIndex(
	currentChapter = currentChapterPage
): Readable<number> {
	const images = getChapterDoublePageIndexes();
	return derived([images, currentChapter], ([$images, $currentPage]) => {
		$images.findIndex((image) => {
			if (isArray(image)) {
				return image.includes($currentPage);
			} else {
				return image == $currentPage;
			}
		});
	});
}
