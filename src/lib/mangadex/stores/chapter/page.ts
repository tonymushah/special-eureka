import { dev } from "$app/environment";
import { emit, listen } from "@tauri-apps/api/event";
import { getCurrentWebview } from "@tauri-apps/api/webview";
import { get, readable, type Readable, type Writable } from "svelte/store";

type ChapterSyncPayload = {
	page: number,
	emitter?: string
}

function getChapterSyncReadable(chapterId: string): Readable<number | null> {
	return readable<number | null>(null, (set) => {
		const ev_ = listen<ChapterSyncPayload>(eventName(chapterId), (ev) => {
			const payload = ev.payload;
			if (payload.emitter !== getCurrentWebview().label) {
				set(payload.page);
			}
		})
		return () => {
			ev_.then((d) => d());
		}
	});
}

function eventName(chapterId: string) {
	return `mangadex://chapter-sync/${chapterId}`;
}

function emitChapterSync(chapterId: string, page: number) {
	return emit<ChapterSyncPayload>(eventName(chapterId), { page, emitter: getCurrentWebview().label });
}

export function getChapterPageSync(chapterId: string): Writable<number | null> {
	const read = getChapterSyncReadable(chapterId);
	return {
		subscribe(run, invalidate) {
			return read.subscribe(run, invalidate);
		},
		set(value) {
			if (typeof value == "number") {
				const prom = emitChapterSync(chapterId, value);
				if (dev) {
					prom.catch(console.error)
				}
			}
		},
		update(updater) {
			const value = updater(get(read));
			if (typeof value == "number") {
				const prom = emitChapterSync(chapterId, value);
				if (dev) {
					prom.catch(console.error)
				}
			}
		},
	}
}