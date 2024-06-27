import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	get: getChapterCurrentPage,
	getReadonly: getChapterCurrentPageReadOnly,
	init: initChapterCurrentPage
} = generateContextStoresMethods<number>("CHAPTER-CURRENT-PAGE");
