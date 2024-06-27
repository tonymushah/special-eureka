import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	get: getChapterCurrentPageContext,
	getReadonly: getChapterCurrentPageContextReadOnly,
	init: initChapterCurrentPageContext
} = generateContextStoresMethods<number>("CHAPTER-CURRENT-PAGE");
