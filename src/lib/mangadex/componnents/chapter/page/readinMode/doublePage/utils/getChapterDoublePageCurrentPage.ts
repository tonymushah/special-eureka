import { type Readable } from "svelte/store";
import type { ChapterDoublePageImage } from "./getChapterImagesAsDoublePage";

import { getDoublePageChapterCurrentPageContext } from "./contexts/current-page";

export default function getChapterDoublePageCurrentPage(): Readable<
	ChapterDoublePageImage | undefined
> {
	return getDoublePageChapterCurrentPageContext();
}
