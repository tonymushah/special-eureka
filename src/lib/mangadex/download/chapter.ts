import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import type {
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables,
	DownloadMode
} from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { createMutation, createQuery } from "@tanstack/svelte-query";
import { type OperationResult } from "@urql/svelte";
import { debounce } from "lodash";
import { derived, readable, type Readable } from "svelte/store";
import { mangadexQueryClient } from "..";

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

export const invalidateChapterOfflinePresence = async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.refetchQueries({
		queryKey,
		exact: true
	});
};

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

export const removeMutation = createMutation(
	{
		mutationKey: ["chapter-removing"],
		async mutationFn(id: string) {
			return await client
				.mutation(remove_chapter_mutation, {
					id
				})
				.toPromise();
		},
		onSettled(data, error, variables, context) {
			invalidateChapterOfflinePresence(variables);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Removed chapter",
					description: variables
				}
			});
		},
		networkMode: "always"
	},
	mangadexQueryClient
);

export const cancelDownloadMutation = createMutation(
	{
		mutationKey: ["chapter", "download", "cancel"],
		async mutationFn(id: string) {
			return await client
				.mutation(canceled_download_mutation, {
					id
				})
				.toPromise();
		},
		onSettled(data, error, variables, context) {
			invalidateChapterOfflinePresence(variables);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Cancelled chapter download",
					description: variables
				}
			});
		},
		networkMode: "always"
	},
	mangadexQueryClient
);

export const downloadMutation = createMutation(
	{
		mutationKey: ["chapter", "download"],
		async mutationFn({ id, quality }: { id: string; quality?: DownloadMode }) {
			const res = await client
				.mutation(download_mutation, {
					id,
					quality
				})
				.toPromise();
			return res;
		},
		onSettled(data, error, variables, context) {
			invalidateChapterOfflinePresence(variables.id);
		},
		onError(error, variables, context) {
			addErrorToast("Error on downloading title", error);
		}
	},
	mangadexQueryClient
);

type ChapterSubOpType = OperationResult<
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables
>;

export function chapterDownloadStateRaw({
	id,
	deferred
}: {
	id: string;
	deferred?: boolean;
}): Readable<ChapterSubOpType | undefined> {
	return subOpChapter(id, deferred);
}

export function isChapterPresentRaw(id: string) {
	const queryKey = offlinePresenceQueryKey(id);
	return createQuery(
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
}

export default function chapterDownloadState({
	id,
	deferred
}: {
	id: string;
	deferred?: boolean;
}): Readable<ChapterDownloadState> {
	return derived(
		[isChapterPresentRaw(id), chapterDownloadStateRaw({ id, deferred }), removeMutation],
		([$isChapterPresentRaw, $rawState, $removeMutation], set, update) => {
			const res = (() => {
				if ($removeMutation.isPending) {
					return ChapterDownloadState.Removing;
				}
				if ($isChapterPresentRaw?.data) {
					const data = $rawState?.data?.watchChapterDownloadState;
					if (data?.downloading) {
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
					} else if (data?.error) {
						return ChapterDownloadState.Error;
					} else if (data?.isCanceled) {
						return ChapterDownloadState.Canceled;
					} else if (data?.isOfflineAppStateNotLoaded) {
						return ChapterDownloadState.OfflineAppStateNotLoaded;
					}
				} else if ($rawState?.error) {
					return ChapterDownloadState.Error;
				}
				const isPresentData = $isChapterPresentRaw.data?.data?.downloadState.chapter;
				if (isPresentData?.hasFailed) {
					return ChapterDownloadState.Error;
				} else if (isPresentData?.isDownloaded) {
					return ChapterDownloadState.Done;
				} else {
					return ChapterDownloadState.Pending;
				}
			})();
			set(res);
		},
		ChapterDownloadState.Pending as ChapterDownloadState
	);
}

export function isChapterDownloading(param: { id: string; deferred?: boolean }): Readable<boolean> {
	return derived(
		chapterDownloadStateRaw(param),
		(result) => {
			if (result?.data?.watchChapterDownloadState.downloading) {
				return true;
			} else {
				return false;
			}
		},
		false
	);
}

export function chapterDowloadingImageState(param: { id: string; deferred?: boolean }) {
	return derived(chapterDownloadStateRaw(param), (result) => {
		return result?.data?.watchChapterDownloadState.downloading?.fetchingImage;
	});
}

export function chapterDownloadingError(param: { id: string; deferred?: boolean }) {
	return derived(chapterDownloadStateRaw(param), (result) => {
		if (result?.error) {
			return result?.error;
		} else if (result?.data?.watchChapterDownloadState.error) {
			return new Error(result?.data.watchChapterDownloadState.error);
		}
	});
}

export function hasChapterDownloadingFailed(param: { id: string; deferred?: boolean }) {
	return derived(chapterDownloadState(param), (result) => {
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

export function chapterDownloadStateImages(param: { id: string; deferred?: boolean }) {
	return derived(
		[chapterDowloadingImageState(param), isChapterDownloading(param)],
		([_state, $is_downloading]) => {
			const [left, right, hasImages] = (() => {
				if (_state && $is_downloading) {
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
		}
	);
}

export function isChapterDownloaded(param: { id: string; deferred?: boolean }) {
	return derived(chapterDownloadState(param), (result) => {
		switch (result) {
			case ChapterDownloadState.Done:
				return true;

			default:
				return false;
		}
	});
}

/*
export class ChapterDownload {
	private chapterId: string;
	private mode?: DownloadMode;
	protected isPresentInner: Readable<boolean>;
	private reexecute: () => void;
	protected hasFailedInner: Readable<boolean>;
	private isRemoving_: Writable<boolean>;
	protected sub_op: Readable<ChapterSubOpType | undefined>;
	
	constructor(chapterId: string, mode?: DownloadMode) {
		const id = chapterId;
		((this.chapterId = chapterId), (this.mode = mode));

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
					} else if (data.isOfflineAppStateNotLoaded) {
						return ChapterDownloadState.OfflineAppStateNotLoaded;
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
		const id = this.chapterId;
		const rexec = this.reexecute;
		const quality = this.mode;

		const res = await get(downloadMutation).mutateAsync(
			{
				id,
				quality
			},
			{
				onSettled(data, error, variables, context) {
					rexec();
				}
			}
		);
		return res;
	}
	public async remove() {
		const id = this.chapterId;
		const rexec = this.reexecute;
		const removing = this.isRemoving_;

		return await Promise.resolve()
			.then(() => {
				removing.set(true);
			})
			.then(() => get(removeMutation).mutateAsync(id))
			.finally(() => {
				removing.set(false);
				rexec();
			});
	}
	public async cancel() {
		const res = await client
			.mutation(ChapterDownload.cancel_dowload_mutation(), {
				id: this.chapterId
			})
			.toPromise();
		if (res.error) {
			throw res.error;
		}
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
		return derived(
			[this.images_state(), this.is_downloading()],
			([_state, $is_downloading]) => {
				const [left, right, hasImages] = (() => {
					if (_state && $is_downloading) {
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
			}
		);
	}
}
*/
