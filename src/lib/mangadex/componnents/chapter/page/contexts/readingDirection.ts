import type { Direction } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	getReadonly: getCurrentChapterDirection,
	get: getCurrentChapterDirectionWritable,
	init: initCurrentChapterDirection
} = generateContextStoresMethods<Direction>("CURRENT_CHAPTER_DIRECTION");
