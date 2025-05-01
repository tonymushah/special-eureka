import { type Readable } from "svelte/store";
import { getDoublePageChapterCurrentPageIndexContext } from "./contexts/current-page-index";

export default function getChapterDoublePageCurrentPageIndex(
): Readable<number> {
	return getDoublePageChapterCurrentPageIndexContext()
}

