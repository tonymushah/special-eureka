import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
import { isArray } from "lodash";
import { getContext, setContext } from "svelte";
import { derived, readonly, type Readable } from "svelte/store";
import getChapterDoublePageIndexes from "../getChapterDoublePageIndexes";

type ChapterImages = number;

const KEY = "chapter-page-double-page-current-page-index";

export function initDoublePageChapterCurrentPageIndexContext(
	currentChapter = readonly(getChapterCurrentPageContext())
): Readable<ChapterImages> {
	const images = getChapterDoublePageIndexes();

	return setContext<Readable<ChapterImages>>(
		KEY,
		derived([images, currentChapter], ([$images, $currentPage]) => {
			return $images.findIndex((image) => {
				if (isArray(image)) {
					return image.includes($currentPage);
				} else {
					return image == $currentPage;
				}
			});
		})
	);
}

export function getDoublePageChapterCurrentPageIndexContext(): Readable<ChapterImages> {
	const context = getContext<Readable<ChapterImages> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}
