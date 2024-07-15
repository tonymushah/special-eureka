import { generateContextStoresMethods } from "@mangadex/utils/contexts";
import { derived, type Writable } from "svelte/store";

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
} = generateContextStoresMethods<RelatedChapters>(
	"RELATED_CHAPTERS_CONTEXT_DATA",
	"The related chapters context data is undefined"
);

export function hasRelatedChapters() {
	return derived(getRelatedChapters(), ($related) => $related.length == 0);
}
