import { graphql } from "@mangadex/gql/exports";
import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
import type { Client } from "@urql/svelte";
import { readable, type Readable } from "svelte/store";

type GetChapterDownloadStateParams = {
	id: string;
	client: Client;
};

export const isChapterDownloadedQuery = graphql(`
	query isChapterDownloaded($id: UUID!) {
		chapter {
			isDownloaded(id: $id) {
				isDownloaded
				hasFailed
			}
		}
	}
`);

export const ChapterDownloadStateSubQuery = graphql(`
	subscription watchChapterDownloadState($id: UUID!) {
		watchDownloadState(objectId: $id) {
			hasFailed
			isDownloaded
		}
	}
`);

export function DownloadStateToChapterDownloadState(data: {
	isDownloaded: boolean;
	hasFailed: boolean;
}): ChapterDownloadState {
	if (data.isDownloaded) {
		if (!data.hasFailed) {
			return ChapterDownloadState.Downloaded;
		} else {
			return ChapterDownloadState.Failed;
		}
	} else {
		return ChapterDownloadState.NotDownloaded;
	}
}

export default function getChapterDownloadState({
	id,
	client
}: GetChapterDownloadStateParams): Readable<ChapterDownloadState> {
	const store = readable<ChapterDownloadState>(ChapterDownloadState.NotDownloaded, (set) => {
		client
			.query(isChapterDownloadedQuery, {
				id
			})
			.toPromise()
			.then((r) => {
				const data = r.data?.chapter.isDownloaded;
				if (data) set(DownloadStateToChapterDownloadState(data));
			});
		const sub = client
			.subscription(ChapterDownloadStateSubQuery, {
				id
			})
			.subscribe((v) => {
				const state = v.data?.watchDownloadState;
				if (state) set(DownloadStateToChapterDownloadState(state));
			});
		return () => {
			sub.unsubscribe();
		};
	});

	return store;
}
