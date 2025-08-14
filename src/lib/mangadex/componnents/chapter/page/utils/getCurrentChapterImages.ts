import ChapterPages, { type ChapterPagesStore } from "@mangadex/stores/chapter/pages";
import { derived, type Readable } from "svelte/store";
import { getCurrentChapterData } from "../contexts/currentChapter";

export default function getCurrentChapterImages(): ChapterPagesStore {
	return ChapterPages.initFromStore(derived(getCurrentChapterData(), (c) => c.id))
}