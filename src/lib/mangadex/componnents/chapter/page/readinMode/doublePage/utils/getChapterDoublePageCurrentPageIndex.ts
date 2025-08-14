import { isArray } from "lodash";
import { derived, type Readable } from "svelte/store";
import { getChapterCurrentPageContext } from "../../../contexts/currentPage";
import getChapterDoublePageIndexes from "./getChapterDoublePageIndexes";

export default function getChapterDoublePageCurrentPageIndex(): Readable<number> {
	const doublePages = getChapterDoublePageIndexes();
	const currentPageContext = getChapterCurrentPageContext();

	return derived(
		[doublePages, currentPageContext],
		([$images, $currentPage]) => {
			return $images.findIndex((image) => {
				if (isArray(image)) {
					return image.includes($currentPage);
				} else {
					return image == $currentPage;
				}
			});
		}
	);
}