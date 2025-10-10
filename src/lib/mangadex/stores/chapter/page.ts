import { dev } from "$app/environment";
import { app } from "@tauri-apps/api";
import { emit, listen } from "@tauri-apps/api/event";
import { get, readable, type Readable, type Writable } from "svelte/store";

function getChapterSyncReadable(chapterId: string): Readable<number | null> {
	return readable<number | null>(null, (set) => {
		const ev_ = listen<number>(eventName(chapterId), (ev) => {
			set(ev.payload);
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
	return emit<number>(eventName(chapterId), page);
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