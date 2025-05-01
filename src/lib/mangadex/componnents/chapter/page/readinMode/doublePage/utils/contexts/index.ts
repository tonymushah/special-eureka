import type { Readable } from "svelte/store";
import { initChapterImagesRatioContext } from "./images-ratios";
import { initDoublePageChapterImagesContext } from "./images-double";

export default function initDoublePageContexts(param?: { images?: Readable<string[]> }) {
	const ratios = initChapterImagesRatioContext(param?.images);
	const doubleImages = initDoublePageChapterImagesContext(ratios);
	return {
		ratios,
		doubleImages
	};
}