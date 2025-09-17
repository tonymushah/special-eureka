import { anyChapterSub, individualChapterSub } from "@mangadex/gql-docs/read-markers/chapters";
import { client } from "@mangadex/gql/urql";
import { readable, type Readable } from "svelte/store";

export type ChapterReadMarkersItem = {
	chapter: string,
	read: boolean
};

export const listenToAnyChapterReadMarkers = readable<ChapterReadMarkersItem | undefined>(undefined, (set) => {
	const sub = client.subscription(anyChapterSub, {}).subscribe((d) => {
		if (d.data) {
			const item = d.data.watchReadMarkers;
			set({
				chapter: item.chapter,
				read: item.read
			});
		}
	});
	return () => {
		sub.unsubscribe()
	}
});

export default function chapterReadState(id: string): Readable<boolean> {
	return readable(false, (set) => {
		const sub = client.subscription(individualChapterSub, { id }).subscribe((d) => {
			if (d.data) {
				const item = d.data.watchReadMarker;
				set(item);
			}
		});
		return () => {
			sub.unsubscribe()
		}
	});
}

