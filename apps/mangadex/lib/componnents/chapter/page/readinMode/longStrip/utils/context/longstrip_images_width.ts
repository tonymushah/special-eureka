import { generateContextStoresMethods } from "@mangadex/utils/contexts";

export const {
	init: initLongStripImagesWidthContext,
	get: getLongStripImagesWidthContextWritable,
	getReadonly: getLongStripImagesWidthContext
} = generateContextStoresMethods<number>("LONGSTRIP-IMAGES-WIDTH");
