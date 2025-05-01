import { type Readable } from "svelte/store";
import { getDoublePageChapterImagesContext } from "./contexts/images-double";

export type ChapterDoublePageImage = string | [string, string];

export default function getChapterImagesAsDoublePage(): Readable<ChapterDoublePageImage[]> {
	return getDoublePageChapterImagesContext();
}
