import { getContext, setContext } from "svelte";
import { type Readable } from "svelte/store";
import { getChapterImagesRatioStore } from "../getChapterImagesRatio";
import { getChapterImageContext } from "../../../../contexts/images";

type ChapterImagesList = Array<string>;
type ChapterImagesRation = Map<string, number>;

const KEY = "chapter-page-images-ratios";

export function initChapterImagesRatioContext(images: Readable<ChapterImagesList> = getChapterImageContext()): Readable<ChapterImagesRation> {
	return setContext<Readable<ChapterImagesRation>>(KEY, getChapterImagesRatioStore(images));
}

export function getChapterImagesRatioContext(): Readable<ChapterImagesRation> {
	const context = getContext<Readable<ChapterImagesRation> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}
