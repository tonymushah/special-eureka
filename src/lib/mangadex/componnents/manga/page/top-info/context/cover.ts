import { getContext, setContext } from "svelte";
import type { Readable } from "svelte/store";

const key = "top-info-cover";

type TopInfoCover = Readable<string | undefined>;

export function setTopCoverContextStore(cover: TopInfoCover) {
	return setContext<TopInfoCover>(key, cover);
}

export function getTopCoverContextStore() {
	const coverContext = getContext<TopInfoCover | undefined>(key);
	if (coverContext) {
		return coverContext;
	} else {
		throw new Error(`\`${key}\` is not declared`);
	}
}
