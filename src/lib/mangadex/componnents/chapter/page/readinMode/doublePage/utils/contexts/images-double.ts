import { getContext, setContext } from "svelte";
import { derived, type Readable } from "svelte/store";
import generateDoublePageOutput from "../generateDoublePageOutput";
import type { ChapterDoublePageImage } from "../getChapterImagesAsDoublePage";
import getChapterImagesRatio from "../getChapterImagesRatio";

type ChapterImagesList = Array<ChapterDoublePageImage>;
type ChapterImagesRation = Map<string, number>;

const KEY = "chapter-page-double-images";

export function initDoublePageChapterImagesContext(ratios: Readable<ChapterImagesRation> = getChapterImagesRatio()): Readable<ChapterImagesList> {
	return setContext<Readable<ChapterImagesList>>(KEY, derived(ratios, (ratios) => generateDoublePageOutput(ratios)));
}

export function getDoublePageChapterImagesContext(): Readable<ChapterImagesList> {
	const context = getContext<Readable<ChapterImagesList> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		throw new Error(`${KEY} is not defined`);
	}
}
