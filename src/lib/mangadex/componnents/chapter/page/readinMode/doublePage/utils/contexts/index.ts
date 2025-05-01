import type { Readable } from "svelte/store";
import { initChapterImagesRatioContext } from "./images-ratios";
import { initDoublePageChapterImagesContext } from "./images-double";
import { initDoublePageChapterIndexesContext } from "./indexes";

export default function initDoublePageContexts(param?: { images?: Readable<string[]> }) {
	const ratios = initChapterImagesRatioContext(param?.images);
	const doubleImages = initDoublePageChapterImagesContext(ratios);
	const indexes = initDoublePageChapterIndexesContext(doubleImages);
	return {
		ratios,
		doubleImages,
		indexes
	};
}