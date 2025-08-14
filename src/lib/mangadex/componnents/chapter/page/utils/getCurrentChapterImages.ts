import ChapterPages from "@mangadex/stores/chapter/pages";
import { derived, type Readable } from "svelte/store";
import { getCurrentChapterData } from "../contexts/currentChapter";

export default function getCurrentChapterImages(): Readable<ChapterPages> {
	return ChapterPages.initFromStore(derived(getCurrentChapterData(), (c) => c.id))
}