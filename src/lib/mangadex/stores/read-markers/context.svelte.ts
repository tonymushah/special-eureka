import { Context } from "runed";
import { SvelteMap } from "svelte/reactivity";
import chapterReadState from "../read-markers";

export class ContextReadChapterMarkers extends SvelteMap<string, boolean> {}

const ctt = new Context<ContextReadChapterMarkers>("READ-MARKERS-CONTEXT");

export function initContextReadChapterMarkers(
	map?: ContextReadChapterMarkers
): ContextReadChapterMarkers {
	return ctt.set(map ?? new ContextReadChapterMarkers());
}

export function getContextReadChapterMarkers() {
	return ctt.get();
}

export function getContextReadChapterMarker(chapter: () => string) {
	let context = getContextReadChapterMarkers();
	let watch = $state<boolean>(false);
	$effect.pre(() => {
		let chapter_id = chapter();
		return chapterReadState(chapter_id).subscribe((val) => {
			watch = val;
		});
	});
	let der = $derived.by(() => {
		const val = context.get(chapter());
		if (typeof val == "boolean") {
			return val;
		} else {
			return watch;
		}
	});
	return {
		get value() {
			return der;
		}
	};
}
