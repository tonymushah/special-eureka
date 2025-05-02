import type { Readable } from "svelte/store";
import { initChapterImagesRatioContext } from "./images-ratios";
import { initDoublePageChapterImagesContext } from "./images-double";
import { initDoublePageChapterIndexesContext } from "./indexes";
import { initDoublePageChapterCurrentPageContext } from "./current-page";
import { initDoublePageChapterCurrentPageIndexContext } from "./current-page-index";

export default function initDoublePageContexts(param?: {
	images?: Readable<string[]>;
	currentChapter?: Readable<number>;
}) {
	const ratios = initChapterImagesRatioContext(param?.images);
	const doubleImages = initDoublePageChapterImagesContext(ratios);
	const indexes = initDoublePageChapterIndexesContext(doubleImages);
	const index = initDoublePageChapterCurrentPageIndexContext(param?.currentChapter);
	const currentPage = initDoublePageChapterCurrentPageContext(param?.currentChapter);
	return {
		ratios,
		doubleImages,
		indexes,
		index,
		currentPage
	};
}
