import ChapterPages, { type ChapterPagesStore } from "@mangadex/stores/chapter/pages";
import { derived, type Readable } from "svelte/store";
import { getCurrentChapterData } from "../contexts/currentChapter";
import { getContext, setContext } from "svelte";

const KEY = "CHAPTER-CURRENT-IMAGES";

function init(): ChapterPagesStore {
	return ChapterPages.initFromStore(derived(getCurrentChapterData(), (c) => c.id));
}

function getFromContext(): ChapterPagesStore {
	const cx = getContext<ChapterPagesStore | undefined>(KEY);
	if (cx) {
		return cx;
	} else {
		return setContext(KEY, init());
	}
}

export default function getCurrentChapterImages(noContext?: boolean): ChapterPagesStore {
	if (noContext) {
		return init();
	} else {
		return getFromContext();
	}
}
