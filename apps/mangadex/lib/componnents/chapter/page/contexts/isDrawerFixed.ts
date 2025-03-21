import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	getReadonly: isDrawerFixed,
	get: isDrawerFixedWritable,
	init: initIsDrawerFixedWritable
} = generateContextStoresMethods<boolean>("IS_DRAWER_FIXED");
