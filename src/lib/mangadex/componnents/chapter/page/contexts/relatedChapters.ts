import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import type { Writable } from "svelte/store";

export type RelatedChapter = {
	volume?: string;
	chapter?: string;
	id: string;
};

export type RelatedChapters = Array<RelatedChapter>;

export const {
	init: initRelatedChapters,
	get: getRelatedChaptersWritable,
	getReadonly: getRelatedChapters
} = generateContextStoresMethods(
	"RELATED_CHAPTERS_CONTEXT_DATA",
	"The related chapters context data is undefined"
);
