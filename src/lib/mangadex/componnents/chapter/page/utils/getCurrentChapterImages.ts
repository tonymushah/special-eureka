import ChapterPages from "@mangadex/stores/chapter/pages.svelte";
import { chapterQuality } from "@mangadex/stores/chapterQuality";
import { getContext, setContext } from "svelte";
import { fromStore } from "svelte/store";
import { getCurrentChapterData } from "../contexts/currentChapter";

const KEY = "CHAPTER-CURRENT-IMAGES";

function init(): ChapterPages {
	const currentCtx = getCurrentChapterData();
	const current = fromStore(currentCtx);
	const mode = fromStore(chapterQuality);
	return new ChapterPages({
		chapter_id: () => current.current.id,
		mode: () => mode.current
	});
}

function getFromContext(): ChapterPages {
	const cx = getContext<ChapterPages | undefined>(KEY);
	if (cx) {
		return cx;
	} else {
		return setContext(KEY, init());
	}
}

export default function getCurrentChapterImages(noContext?: boolean): ChapterPages {
	if (noContext == true) {
		return init();
	} else {
		return getFromContext();
	}
}
