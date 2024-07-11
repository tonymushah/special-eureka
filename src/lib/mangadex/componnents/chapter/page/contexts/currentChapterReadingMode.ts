import type { ReadingMode } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	getReadonly: getCurrentChapterReadingMode,
	get: getCurrentChapterReadingModeWritable,
	init: initCurrentChapterReadingMode
} = generateContextStoresMethods<ReadingMode>("CURRENT_CHAPTER_READING_MODE");
