import { derived, get } from "svelte/store";
import { getCurrentChapterData } from "./currentChapter";
import { getRelatedChapters, getRelatedNextPrevious } from "./relatedChapters";
import {
	addListenerToChapterNextEventTarget,
	addListenerToChapterPreviousEventTarget
} from "./previousNextEventTarget";
import { goto } from "$app/navigation";
import { route } from "$lib/ROUTES";

type UnlistenFn = () => void;

export default function registerPreviousNextChapterEvent(): UnlistenFn {
	const currentSt = getCurrentChapterData();
	const relatedSt = getRelatedChapters();
	const nextPrevious = derived([currentSt, relatedSt], ([$current, $relatedSt]) =>
		getRelatedNextPrevious($current.id, $relatedSt, true)
	);

	let nextUnlisten: UnlistenFn | undefined = undefined;
	let previousUnlisten: UnlistenFn | undefined = undefined;
	const nextUnsub = nextPrevious.subscribe((np) => {
		const currentTitleId = get(currentSt).series?.id;
		if (nextUnlisten != undefined) {
			nextUnlisten();
		}
		nextUnlisten = addListenerToChapterNextEventTarget(() => {
			const next = np.next;
			if (next) {
				goto(
					route("/mangadex/chapter/[id]", {
						id: next
					})
				);
			} else if (currentTitleId) {
				goto(
					route("/mangadex/title/[id]", {
						id: currentTitleId
					})
				);
			}
		});
	});
	const previousUnsub = nextPrevious.subscribe((np) => {
		const currentTitleId = get(currentSt).series?.id;
		if (previousUnlisten != undefined) {
			previousUnlisten();
		}
		previousUnlisten = addListenerToChapterPreviousEventTarget(() => {
			const previous = np.previous;
			if (previous) {
				goto(
					`${route("/mangadex/chapter/[id]", {
						id: previous
					})}?startPage=end`
				);
			} else if (currentTitleId) {
				goto(
					route("/mangadex/title/[id]", {
						id: currentTitleId
					})
				);
			}
		});
	});
	return () => {
		if (nextUnlisten != undefined) {
			nextUnlisten();
		}
		if (previousUnlisten != undefined) {
			previousUnlisten();
		}
		nextUnsub();
		previousUnsub();
	};
}
