import { type Readable } from "svelte/store";
import { getDoublePageChapterIndexesContext } from "./contexts/indexes";

type ChapterDoublePageIndex = number | [number, number];

export default function getChapterDoublePageIndexes(): Readable<ChapterDoublePageIndex[]> {
	return getDoublePageChapterIndexesContext()
}
