import ChapterPages, { type ChapterPagesStore } from "@mangadex/stores/chapter/pages";
import { derived, get, type Readable } from "svelte/store";
import { getCurrentChapterData } from "../contexts/currentChapter";
import { getContext, setContext } from "svelte";
import { chapterQuality } from "@mangadex/stores/chapterQuality";

const KEY = "CHAPTER-CURRENT-IMAGES";

function init(): ChapterPagesStore {
	return ChapterPages.initFromStore(derived(getCurrentChapterData(), (c) => c.id), {
		mode: get(chapterQuality)
	});
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
	if (noContext == true) {
		return init();
	} else {
		return getFromContext();
	}
}
