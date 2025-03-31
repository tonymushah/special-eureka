import { graphql } from "@mangadex/gql";
import type { DownloadMode } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { subscriptionStore } from "@urql/svelte";
import { derived, type Readable } from "svelte/store";

const download_mutation = graphql(`
	mutation downloadChapterMutation($id: UUID!, $quality: DownloadMode) {
		chapter {
			download(id: $id, quality: $quality) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const canceled_download_mutation = graphql(`
	mutation cancelDownloadChapterMutation($id: UUID!) {
		chapter {
			cancelDownload(id: $id)
		}
	}
`);

const subscription = graphql(`
	subscription chapterDownloadState($id: UUID!) {
		watchChapterDownloadState(chapterId: $id) {
			isPending
			isDone
			isCanceled
			isOfflineAppStateNotLoaded
			error
			downloading {
				isPreloading
				isFetchingData
				fetchingImage {
					filename
					index
					len
				}
				isFetchingAtHomeData
			}
		}
	}
`)

const remove_chapter_mutation = graphql(`
	mutation removeDownloadedChapter($id: UUID!) {
		chapter {
			remove(id: $id)
		}
	}
`);

export enum ChapterDownloadState {
	Pending,
	Done,
	Canceled,
	OfflineAppStateNotLoaded,
	Error,
	Preloading,
	FetchingAtHomeData,
	FetchingImages,
	FetchingData
}

export class ChapterDownload {
	private chapterId: string;
	private mode?: DownloadMode;
	/**
	 *
	 */
	constructor(chapterId: string, mode?: DownloadMode) {
		this.chapterId = chapterId,
			this.mode = mode;
	}
	public set quality(val: DownloadMode) {
		this.mode = val
	}
	public get quality(): DownloadMode | undefined {
		return this.mode;
	}
	public sub_raw_state() {
		return subscriptionStore({
			client,
			query: subscription,
			variables: {
				id: this.chapterId
			}
		})
	}
	public state(): Readable<ChapterDownloadState> {
		return derived(this.sub_raw_state(), (result) => {
			if (result.data) {
				const data = result.data.watchChapterDownloadState;
				if (data.downloading) {
					const downloading = data.downloading
					if (downloading.fetchingImage) {
						return ChapterDownloadState.FetchingImages
					} else if (downloading.isFetchingAtHomeData) {
						return ChapterDownloadState.FetchingAtHomeData
					} else if (downloading.isFetchingData) {
						return ChapterDownloadState.FetchingData
					} else {
						return ChapterDownloadState.Preloading
					}
				} else if (data.error) {
					return ChapterDownloadState.Error
				} else if (data.isCanceled) {
					return ChapterDownloadState.Canceled
				} else if (data.isDone) {
					return ChapterDownloadState.Done
				} else if (data.isOfflineAppStateNotLoaded) {
					return ChapterDownloadState.OfflineAppStateNotLoaded
				} else {
					return ChapterDownloadState.Pending
				}
			} else if (result.error) {
				return ChapterDownloadState.Error;
			} else {
				return ChapterDownloadState.Pending;
			}
		})
	}
	public is_downloading() {
		return derived(this.sub_raw_state(), (result) => {
			const downloading = result.data?.watchChapterDownloadState.downloading;
			return downloading != undefined && downloading != null
		})
	}
	public static download_mutation() {
		return download_mutation
	}
	public static subscription() {
		return subscription
	}
	public static cancel_dowload_mutation() {
		return canceled_download_mutation;
	}
	public static remove_chapter_mutation() {
		return remove_chapter_mutation
	}
	public images_state() {
		return derived(this.sub_raw_state(), (result) => {
			result.data?.watchChapterDownloadState.downloading?.fetchingImage
		})
	}
	public error() {
		return derived(this.sub_raw_state(), (result) => {
			if (result.error) {
				return result.error
			} else if (result.data?.watchChapterDownloadState.error) {
				return new Error(result.data.watchChapterDownloadState.error)
			}
		})
	}
	public async download() {
		return await client.mutation(ChapterDownload.download_mutation(), {
			id: this.chapterId,
			quality: this.mode
		}).toPromise();
	}
	public async cancel() {
		return await client.mutation(ChapterDownload.cancel_dowload_mutation(), {
			id: this.chapterId
		}).toPromise();
	}
	public async remove() {
		return await client.mutation(ChapterDownload.remove_chapter_mutation(), {
			id: this.chapterId
		}).toPromise();
	}
	public has_failed() {
		return derived(this.state(), (result) => {
			switch (result) {
				case ChapterDownloadState.Error | ChapterDownloadState.Canceled:
					return true;

				default:
					return false;
			}
		})
	}
	public is_downloaded() {
		return derived(this.state(), (result) => {
			switch (result) {
				case ChapterDownloadState.Done:
					return true;

				default:
					return false;
			}
		})
	}
}