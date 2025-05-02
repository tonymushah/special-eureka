import { isArray } from "lodash";
import { getContext, setContext } from "svelte";
import { derived, type Readable } from "svelte/store";
import type { ChapterDoublePageImage } from "../getChapterImagesAsDoublePage";
import getChapterImagesAsDoublePage from "../getChapterImagesAsDoublePage";

type ChapterImagesList = Array<ChapterDoublePageImage>;
type ChapterImagesIndexes = ([number, number] | number)[];

const KEY = "chapter-page-double-indexes";

export function initDoublePageChapterIndexesContext(
	images: Readable<ChapterImagesList> = getChapterImagesAsDoublePage()
): Readable<ChapterImagesIndexes> {
	return setContext<Readable<ChapterImagesIndexes>>(
		KEY,
		derived(images, ($images) => {
			let index = 0;
			return $images.map<number | [number, number]>((img) => {
				if (isArray(img)) {
					index = index + 2;
					return [index - 2, index - 1];
				} else {
					index = index + 1;
					return index - 1;
				}
			});
		})
	);
}

export function getDoublePageChapterIndexesContext(): Readable<ChapterImagesIndexes> {
	const context = getContext<Readable<ChapterImagesIndexes> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}
