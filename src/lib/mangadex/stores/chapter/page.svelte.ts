import { dev } from "$app/environment";
import type { ReadonlyValue, WritableValue } from "$lib";
import { emit, listen } from "@tauri-apps/api/event";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import type { Getter } from "runed";

type ChapterSyncPayload = {
	page: number;
	emitter?: string;
};

function getChapterSyncReadable(chapterId: Getter<string>): ReadonlyValue<number | null> {
	let page = $state<number | null>(null);
	$effect.pre(() => {
		const ev_ = listen<ChapterSyncPayload>(eventName(chapterId()), (ev) => {
			const payload = ev.payload;
			if (payload.emitter !== getCurrentWebview().label) {
				page = payload.page;
			}
		});
		return () => {
			ev_.then((d) => d());
		};
	});
	return {
		get value() {
			return page;
		}
	};
}

function eventName(chapterId: string) {
	return `mangadex://chapter-sync/${chapterId}`;
}

function emitChapterSync(chapterId: string, page: number) {
	return emit<ChapterSyncPayload>(eventName(chapterId), {
		page,
		emitter: getCurrentWebview().label
	});
}

export function getChapterPageSync(_chapterId: Getter<string>): WritableValue<number | null> {
	let chapterId = $derived.by(_chapterId);
	const read = getChapterSyncReadable(_chapterId);
	return {
		get value() {
			return read.value;
		},
		set value(value) {
			if (typeof value == "number") {
				const prom = emitChapterSync(chapterId, value);
				if (dev) {
					prom.catch(console.error);
				}
			}
		}
	};
}
