import { listen } from "@tauri-apps/api/event";
import { writable } from "svelte/store";

const EVENT_KEY = "special-eureka://mangadex/export-to-mal";

export type ExportTaskState =
	| "Preloading"
	| "GettingStatuses"
	| "GettingTitlesData"
	| "GettingScores"
	| {
			FetchingReadChapter: { manga: string };
	  }
	| "AssemblingInfo"
	| "WritingToFile";

export type ExportTaskEventPayload = {
	progress: number;
	state: ExportTaskState;
};

export const exportTaskEvent = writable<ExportTaskEventPayload | null>(null, (set) => {
	const sub = listen<ExportTaskEventPayload>(EVENT_KEY, (ev) => {
		console.debug(ev);
		set(ev.payload);
	});
	return () => {
		sub.then((e) => e()).catch(console.error);
	};
});
