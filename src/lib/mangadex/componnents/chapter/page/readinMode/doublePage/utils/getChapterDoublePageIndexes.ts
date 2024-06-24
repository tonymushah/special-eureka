import { derived, type Readable } from "svelte/store";
import getChapterImagesAsDoublePage from "./getChapterImagesAsDoublePage";
import { isArray } from "lodash";

type ChapterDoublePageIndex = number | [number, number];

export default function getChapterDoublePageIndexes(): Readable<ChapterDoublePageIndex[]> {
	const images = getChapterImagesAsDoublePage();
	return derived(images, ($images) => {
		let index = 0;
		return $images.map<ChapterDoublePageIndex>((img) => {
			if (isArray(img)) {
				index = index + 2;
				return [index - 2, index - 1];
			} else {
				index = index + 1;
				return index - 1;
			}
		});
	});
}
