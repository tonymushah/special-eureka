import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import { writable, type StartStopNotifier, type Writable } from "svelte/store";

export const {
	get: getChapterCurrentPageContext,
	getReadonly: getChapterCurrentPageContextReadOnly,
	init: initChapterCurrentPageContext
} = generateContextStoresMethods<number>("CHAPTER-CURRENT-PAGE");

export function initDefaultChapterCurrentPageContext(
	start?: StartStopNotifier<number>
): Writable<number> {
	return initChapterCurrentPageContext(writable(0, start));
}
