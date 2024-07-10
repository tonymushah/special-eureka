import { generateContextStoresMethods } from "@mangadex/utils/contexts";

const { get, getReadonly, init } = generateContextStoresMethods<boolean>("IS_CHAPTER_DRAWER_LEFT");

export {
	getReadonly as getIsChapterDrawerLeft,
	init as initIsChapterDrawerLeft,
	get as getIsChapterDrawerLeftMutable
};
