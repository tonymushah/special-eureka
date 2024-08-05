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

export class RelatedNextPrevious {
	next?: string;
	previous?: string;
	constructor({ next, previous }: { next?: string; previous?: string }) {
		(this.next = next), (this.previous = previous);
	}
}

export function getRelatedNextPrevious(
	current: string,
	related: RelatedChapters,
	isReversed: boolean = false
): RelatedNextPrevious {
	const index = related.findIndex((rel) => rel.id == current);
	if (index < 0) {
		return new RelatedNextPrevious({});
	} else {
		const nextIndex = index + 1;
		const previousIndex = index - 1;
		const next = nextIndex < 0 ? undefined : related[nextIndex];
		const previous = previousIndex < 0 ? undefined : related[previousIndex];
		return new RelatedNextPrevious({
			next: isReversed ? previous?.id : next?.id,
			previous: isReversed ? next?.id : previous?.id
		});
	}
}
