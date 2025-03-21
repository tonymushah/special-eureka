import { derived, type Readable } from "svelte/store";
import lodash, { isArray } from "lodash";
import getChapterDoublePageIndexes from "./getChapterDoublePageIndexes";
import { getChapterCurrentPageContext } from "../../../contexts/currentPage";

export default function getChapterDoublePageCurrentPageIndex(
	currentChapter = getChapterCurrentPageContext()
): Readable<number> {
	const images = getChapterDoublePageIndexes();
	return derived([images, currentChapter], ([$images, $currentPage]) => {
		return $images.findIndex((image) => {
			if (isArray(image)) {
				return image.includes($currentPage);
			} else {
				return image == $currentPage;
			}
		});
	});
}
