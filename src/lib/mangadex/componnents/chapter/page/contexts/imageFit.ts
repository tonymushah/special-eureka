import type { ImageFit } from "@mangadex/gql/graphql";
import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	getReadonly: getCurrentChapterImageFit,
	get: getCurrentChapterImageFitWritable,
	init: initCurrentChapterImageFit
} = generateContextStoresMethods<ImageFit>("CURRENT_CHAPTER_IMAGE_FIT");
