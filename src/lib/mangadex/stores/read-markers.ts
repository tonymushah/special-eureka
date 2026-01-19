import { anyChapterSub, individualChapterSub } from "@mangadex/gql-docs/read-markers/chapters";
import { client } from "@mangadex/gql/urql";
import { delay } from "lodash";
import { readable, type Readable } from "svelte/store";

export type ChapterReadMarkersItem = {
	chapter: string;
	read: boolean;
};

export const listenToAnyChapterReadMarkers = readable<ChapterReadMarkersItem | undefined>(
	undefined,
	(set) => {
		let unsub: (() => void) | undefined = undefined;
		const timer = delay(() => {
			const sub = client.subscription(anyChapterSub, {}).subscribe((d) => {
				if (d.data) {
					const item = d.data.watchReadMarkers;
					set({
						chapter: item.chapter,
						read: item.read
					});
				}
			});
			unsub = () => {
				sub.unsubscribe();
			};
		}, 1);

		return () => {
			clearTimeout(timer);
			unsub?.();
		};
	}
);

export default function chapterReadState(id: string): Readable<boolean> {
	return readable(false, (set) => {
		let unsub: (() => void) | undefined = undefined;
		const timer = delay(() => {
			const sub = client.subscription(individualChapterSub, { id }).subscribe((d) => {
				if (d.data) {
					const item = d.data.watchReadMarker;
					set(item);
				}
			});
			unsub = () => {
				sub.unsubscribe();
			};
		}, 1);
		return () => {
			clearTimeout(timer);
			unsub?.();
		};
	});
}
