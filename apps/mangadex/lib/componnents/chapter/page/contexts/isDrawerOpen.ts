import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	getReadonly: isDrawerOpen,
	get: isDrawerOpenWritable,
	init: initIsDrawerOpenWritable
} = generateContextStoresMethods<boolean>("IS_DRAWER_OPEN");
