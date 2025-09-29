import { getContext, setContext } from "svelte";
import { derived, readable, type Readable } from "svelte/store";
import chapterReadState from "../read-markers";

const KEY = "READ-MARKERS-CONTEXT";

export function initContextReadChapterMarkers(
	markers: Readable<Map<string, boolean>>
): Readable<Map<string, boolean>> {
	return setContext(KEY, markers);
}

export function getContextReadChapterMarkers(): Readable<Map<string, boolean>> {
	const context = getContext<Readable<Map<string, boolean>> | undefined>(KEY);
	if (context) {
		return context;
	} else {
		return readable(new Map());
	}
}

export function getContextReadChapterMarker(chapter: string): Readable<boolean> {
	const context = derived(getContextReadChapterMarkers(), (markers) => {
		return markers.get(chapter);
	});
	return derived([context, chapterReadState(chapter)], ([$context, $watch]) => {
		return $context ?? $watch;
	});
}
