import { type Readable } from "svelte/store";
import { getDoublePageChapterCurrentPageIndexContext } from "./contexts/current-page-index";
import getChapterDoublePageIndexes from "./getChapterDoublePageIndexes";

export default function getChapterDoublePageCurrentPageIndex(
): Readable<number> {
	const images = getChapterDoublePageIndexes();
	return getDoublePageChapterCurrentPageIndexContext()
}
