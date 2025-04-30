import { graphql } from "@mangadex/gql";
import type {
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables,
	DownloadMode
} from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import {
	queryStore,
	subscriptionStore,
	type OperationResult,
	type OperationResultState,
	type OperationResultStore,
	type Pausable
} from "@urql/svelte";
import {
	derived,
	get,
	readable,
	readonly,
	writable,
	type Readable,
	type Writable
} from "svelte/store";
import { mangadexQueryClient } from "..";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import { debounce, delay, random } from "lodash";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { sleep } from "@melt-ui/svelte/internal/helpers";

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
	subscription chapterDownloadState($id: UUID!, $deferred: Boolean) {
		watchChapterDownloadState(chapterId: $id, deferred: $deferred) {
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
`);

const remove_chapter_mutation = graphql(`
	mutation removeDownloadedChapter($id: UUID!) {
		chapter {
			remove(id: $id)
		}
	}
`);
const chapterOfflineState = graphql(`
	query chapterDownloadStateQ($id: UUID!) {
		downloadState {
			chapter(chapterId: $id) {
				isDownloaded
				hasFailed
			}
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
	FetchingData,
	Removing
}

export function offlinePresenceQueryKey(id: string) {
	return ["chapter", id, "offline-presence"];
}

export const invalidateChapterOfflinePresence = debounce(async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.invalidateQueries({
		queryKey
	});
});

function subOpChapter(id: string, deferred: boolean = false) {
	return readable<ChapterSubOpType | undefined>(undefined, (set) => {
		const mount_sub = isMounted.subscribe(() => {
			invalidateChapterOfflinePresence(id)?.catch(console.warn);
		});
		const sub = client
			.subscription(subscription, {
				id,
				deferred
			})
			.subscribe((res) => {
				set(res);
				mangadexQueryClient.setQueryData(
					["chapter", id, "download-state", "subscription"],
					() => res
				);
				if (res.data?.watchChapterDownloadState.isDone) {
					invalidateChapterOfflinePresence(id)?.catch(console.warn);
				}
			});
		return () => {
			sub.unsubscribe();
			mount_sub();
		};
	});
}

type ChapterSubOpType = OperationResult<
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables
>;

export class ChapterDownload {
	private chapterId: string;
	private mode?: DownloadMode;
	protected isPresentInner: Readable<boolean>;
	private reexecute: () => void;
	protected hasFailedInner: Readable<boolean>;
	private isRemoving_: Writable<boolean>;
	protected sub_op: Readable<ChapterSubOpType | undefined>;
	/**
	 *
	 */
	constructor(chapterId: string, mode?: DownloadMode) {
		const id = chapterId;
		(this.chapterId = chapterId), (this.mode = mode);

		const queryKey = offlinePresenceQueryKey(id);
		const query = createQuery(
			{
				queryKey,
				async queryFn() {
					return await client
						.query(chapterOfflineState, {
							id
						})
						.toPromise();
				}
			},
			mangadexQueryClient
		);
		this.sub_op = subOpChapter(id);

		const is_present = derived(query, (res) => res.data);
		this.isPresentInner = derived(is_present, (result) => {
			return result?.data?.downloadState.chapter.isDownloaded == true;
		});
		this.reexecute = () => {
			invalidateChapterOfflinePresence(id);
		};
		this.hasFailedInner = derived(is_present, (result) => {
			return result?.data?.downloadState.chapter.hasFailed == true;
		});
		this.isRemoving_ = writable(false);
	}
	public static defered(chapterId: string, mode?: DownloadMode) {
		const _this = new ChapterDownload(chapterId, mode);
		_this.sub_op = subOpChapter(chapterId, true);
		return _this;
	}
	public get isRemoving(): Readable<boolean> {
		return readonly(this.isRemoving_);
	}

	private get isPresent(): Readable<boolean> {
		return this.isPresentInner;
	}

	private get hasFailed(): Readable<boolean> {
		return this.hasFailedInner;
	}

	public set quality(val: DownloadMode) {
		this.mode = val;
	}
	public get quality(): DownloadMode | undefined {
		return this.mode;
	}
	public sub_raw_state() {
		return this.sub_op;
	}
	public state(): Readable<ChapterDownloadState> {
		const stores: [
			Readable<ChapterSubOpType | undefined>,
			Readable<boolean>,
			Readable<boolean>,
			Readable<boolean>
		] = [this.sub_raw_state(), this.hasFailed, this.isPresent, this.isRemoving];
		return derived(stores, ([result, hasFailed, isPresent, removing]) => {
			const res = (() => {
				if (removing) {
					return ChapterDownloadState.Removing;
				}
				if (result?.data) {
					const data = result.data.watchChapterDownloadState;
					if (data.downloading) {
						const downloading = data.downloading;
						if (downloading.fetchingImage) {
							return ChapterDownloadState.FetchingImages;
						} else if (downloading.isFetchingAtHomeData) {
							return ChapterDownloadState.FetchingAtHomeData;
						} else if (downloading.isFetchingData) {
							return ChapterDownloadState.FetchingData;
						} else {
							return ChapterDownloadState.Preloading;
						}
					} else if (data.error) {
						return ChapterDownloadState.Error;
					} else if (data.isCanceled) {
						return ChapterDownloadState.Canceled;
					} else if (data.isDone) {
						return ChapterDownloadState.Done;
					} else if (data.isOfflineAppStateNotLoaded) {
						return ChapterDownloadState.OfflineAppStateNotLoaded;
					} else if (data.isPending) {
						if (hasFailed) {
							return ChapterDownloadState.Error;
						} else if (isPresent) {
							return ChapterDownloadState.Done;
						} else {
							return ChapterDownloadState.Pending;
						}
					}
				} else if (result?.error) {
					return ChapterDownloadState.Error;
				}
				if (hasFailed) {
					return ChapterDownloadState.Error;
				} else if (isPresent) {
					return ChapterDownloadState.Done;
				} else {
					return ChapterDownloadState.Pending;
				}
			})();
			return res;
		});
	}
	public is_downloading() {
		return derived(this.state(), (result) => {
			switch (result) {
				case ChapterDownloadState.FetchingAtHomeData:
					return true;
					break;
				case ChapterDownloadState.Preloading:
					return true;
				case ChapterDownloadState.FetchingImages:
					return true;
				case ChapterDownloadState.FetchingData:
					return true;
				default:
					return false;
					break;
			}
		});
	}
	public static download_mutation() {
		return download_mutation;
	}
	public static subscription() {
		return subscription;
	}
	public static cancel_dowload_mutation() {
		return canceled_download_mutation;
	}
	public static remove_chapter_mutation() {
		return remove_chapter_mutation;
	}
	public static chapter_offline_state() {
		return chapterOfflineState;
	}
	public images_state() {
		return derived(this.sub_raw_state(), (result) => {
			return result?.data?.watchChapterDownloadState.downloading?.fetchingImage;
		});
	}
	public error() {
		return derived(this.sub_raw_state(), (result) => {
			if (result?.error) {
				return result?.error;
			} else if (result?.data?.watchChapterDownloadState.error) {
				return new Error(result?.data.watchChapterDownloadState.error);
			}
		});
	}
	public async download() {
		let id = this.chapterId;
		const rexec = this.reexecute;
		let quality = this.mode;
		const res = createMutation(
			{
				mutationKey: ["chapter", "download", id, quality],
				async mutationFn() {
					const res = await client
						.mutation(ChapterDownload.download_mutation(), {
							id,
							quality
						})
						.toPromise();
					return res;
				},
				onSettled(data, error, variables, context) {
					rexec();
				}
			},
			mangadexQueryClient
		);
		await get(res).mutateAsync();
		return res;
	}
	public async remove() {
		let id = this.chapterId;
		const rexec = this.reexecute;
		const removing = this.isRemoving_;
		const res = createMutation(
			{
				mutationKey: ["chapter-removing", id],
				async mutationFn() {
					return await client
						.mutation(ChapterDownload.remove_chapter_mutation(), {
							id
						})
						.toPromise();
				},
				onMutate(variables) {
					removing.set(true);
				},
				onSettled(data, error, variables, context) {
					removing.set(false);
					rexec();
				}
			},
			mangadexQueryClient
		);
		return res;
	}
	public async cancel() {
		const res = await client
			.mutation(ChapterDownload.cancel_dowload_mutation(), {
				id: this.chapterId
			})
			.toPromise();
		this.reexecute();
		return res;
	}
	public has_failed() {
		return derived(this.state(), (result) => {
			switch (result) {
				case ChapterDownloadState.Error:
					return true;
				case ChapterDownloadState.Canceled:
					return true;
				default:
					return false;
			}
		});
	}
	public is_downloaded() {
		return derived(this.state(), (result) => {
			switch (result) {
				case ChapterDownloadState.Done:
					return true;

				default:
					return false;
			}
		});
	}
	public download_state_images() {
		return derived([this.images_state(), this.is_downloading()], ([_state, $is_downloaded]) => {
			let [left, right, hasImages] = (() => {
				if (_state && !$is_downloaded) {
					return [
						`${(_state.index * 100) / _state.len}%`,
						`${100 - (_state.index * 100) / _state.len}%`,
						true
					];
				} else {
					return ["0%", "100%", false];
				}
			})();
			return {
				left,
				right,
				hasImages
			};
		});
	}
}
