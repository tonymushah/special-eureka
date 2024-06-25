import { derived, type Readable } from "svelte/store";
import getChapterImagesRatio from "./getChapterImagesRatio";
import generateDoublePageOutput from "./generateDoublePageOutput";

export type ChapterDoublePageImage = string | [string, string];

export default function getChapterImagesAsDoublePage(): Readable<ChapterDoublePageImage[]> {
	const iratios = getChapterImagesRatio();
	return derived(iratios, (ratios) => generateDoublePageOutput(ratios));
}
