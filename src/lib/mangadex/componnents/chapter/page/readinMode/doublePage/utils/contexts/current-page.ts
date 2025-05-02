import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
import { isArray } from "lodash";
import { getContext, setContext } from "svelte";
import { derived, readonly, type Readable } from "svelte/store";
import getChapterDoublePageCurrentPageIndex from "../getChapterDoublePageCurrentPageIndex";
import type { ChapterDoublePageImage } from "../getChapterImagesAsDoublePage";
import getChapterImagesAsDoublePage from "../getChapterImagesAsDoublePage";

type ChapterImages = ChapterDoublePageImage | undefined;

const KEY = "chapter-page-double-page-current-page";

export function initDoublePageChapterCurrentPageContext(
	currentChapter = readonly(getChapterCurrentPageContext())
): Readable<ChapterImages> {
	const readingDirection = getCurrentChapterDirection();
	const images = getChapterImagesAsDoublePage();
	const current = getChapterDoublePageCurrentPageIndex();

	return setContext<Readable<ChapterImages>>(
		KEY,
		derived([images, current, readingDirection], ([$images, $currentPage, $rd]) => {
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
		})
	);
}

export function getDoublePageChapterCurrentPageContext(): Readable<ChapterImages> {
	const context = getContext<Readable<ChapterImages> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}
