import { internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import type {
	ChapterDownloadStateSubscription,
	ChapterDownloadStateSubscriptionVariables,
	DownloadMode
} from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import {
	createMutation,
	createQuery,
	type Accessor,
	type CreateMutationResult,
	type MutateOptions
} from "@tanstack/svelte-query";
import { type OperationResult } from "@urql/svelte";
import { untrack } from "svelte";
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
		queryKey
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

export const removeMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["chapter-removing"],
			async mutationFn(id: string) {
				return await client
					.mutation(remove_chapter_mutation, {
						id
					})
					.toPromise();
			},
			onSettled(data, error, variables) {
				invalidateChapterOfflinePresence(variables).catch(console.error);
			},
			onSuccess(data, variables) {
				addToast({
					title: "Removed chapter",
					description: variables,
					type: "warning"
				});
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

export const cancelDownloadMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["chapter", "download", "cancel"],
			async mutationFn(id: string) {
				return await client
					.mutation(canceled_download_mutation, {
						id
					})
					.toPromise();
			},
			onSettled(data, error, variables) {
				invalidateChapterOfflinePresence(variables);
			},
			onSuccess(data, variables) {
				addToast({
					title: "Cancelled chapter download",
					description: variables,
					type: "success"
				});
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

type DownloadMutationVariable = {
	id: string;
	quality?: DownloadMode;
};

export const downloadMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["chapter", "download"],
			async mutationFn({ id, quality }: DownloadMutationVariable) {
				const res = await client
					.mutation(download_mutation, {
						id,
						quality
					})
					.toPromise();
				return res;
			},
			onSettled(data, error, variables) {
				invalidateChapterOfflinePresence(variables.id);
			},
			onError(error) {
				addErrorToast("Error on downloading title", error);
			}
		}),
		() => mangadexQueryClient
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

export function isChapterPresentRaw(id: () => string) {
	return () =>
		createQuery(
			() => ({
				queryKey: offlinePresenceQueryKey(id()),
				async queryFn() {
					return await client
						.query(chapterOfflineState, {
							id: id()
						})
						.toPromise()
						.then((d) => {
							return d;
						});
				},
				networkMode: "always"
			}),
			() => mangadexQueryClient
		);
}

export default class ChapterDownload {
	private __state: () => { value: ChapterSubOpType | null };
	private _remove_mutation: CreateMutationResult<unknown, Error, string>;
	private _isChapterPresentRaw: ReturnType<ReturnType<typeof isChapterPresentRaw>>;
	private _chapterId: Accessor<string>;
	public constructor(chapterId: Accessor<string>) {
		let toSet = $state<{ value: ChapterSubOpType | null }>({ value: null });
		this.__state = () => toSet;
		this._chapterId = chapterId;
		this._isChapterPresentRaw = isChapterPresentRaw(chapterId)();
		let _removeMutation = removeMutation();
		this._remove_mutation = _removeMutation;

		$effect(() => {
			let id = chapterId();
			let unsub = chapterDownloadStateRaw({ id }).subscribe((rawState) => {
				if (untrack(() => toSet)) {
					toSet.value = rawState ?? null;
				} else {
					console.log("toSet is nulllllll");
				}
			});
			return () => {
				unsub();
			};
		});
	}
	private get _state(): ReturnType<typeof this.__state> {
		return this.__state();
	}
	public remove(options?: MutateOptions<unknown, Error, string>) {
		this._remove_mutation.mutate(this.chapterId, options);
	}
	public get chapterId(): string {
		return this._chapterId();
	}

	public get isRemoving(): boolean {
		return this._remove_mutation.isPending;
	}
	public get state(): ChapterDownloadState {
		if (this._remove_mutation.isPending) {
			return ChapterDownloadState.Removing;
		}
		if (this._isChapterPresentRaw?.data) {
			const data = this._state?.value?.data?.watchChapterDownloadState;
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
		} else if (this._state?.value?.error) {
			return ChapterDownloadState.Error;
		}
		const isPresentData = this._isChapterPresentRaw?.data?.data?.downloadState?.chapter;
		if (isPresentData?.hasFailed == true) {
			return ChapterDownloadState.Error;
		} else if (isPresentData?.isDownloaded == true) {
			return ChapterDownloadState.Done;
		} else {
			return ChapterDownloadState.Pending;
		}
	}
	public get isDownloading(): boolean {
		switch (this.state) {
			case ChapterDownloadState.Preloading:
				return true;
			case ChapterDownloadState.FetchingAtHomeData:
				return true;
			case ChapterDownloadState.FetchingImages:
				return true;
			case ChapterDownloadState.FetchingData:
				return true;
			default:
				return false;
		}
	}
	public get chapterDowloadingImageState():
		| { filename: string; index: number; len: number }
		| undefined
		| null {
		return this._state?.value?.data?.watchChapterDownloadState.downloading?.fetchingImage;
	}
	public get chapterDownloadingError(): Error | null {
		if (this._state?.value?.error) {
			return this._state?.value?.error;
		} else if (this._state?.value?.data?.watchChapterDownloadState.error) {
			return new Error(this._state?.value?.data.watchChapterDownloadState.error);
		} else {
			return null;
		}
	}
	public get hasChapterDownloadingFailed(): boolean {
		switch (this.state) {
			case ChapterDownloadState.Error:
				return true;
			case ChapterDownloadState.Canceled:
				return true;
			default:
				return false;
		}
	}
	public get isChapterDownloaded(): boolean {
		return this.state === ChapterDownloadState.Done;
	}
	public get chapterDownloadStateImages(): { left: string; right: string; hasImages: boolean } {
		let _state = this.chapterDowloadingImageState;
		let is_downloading = this.isDownloading;
		const [left, right, hasImages] = (() => {
			if (_state && is_downloading) {
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
}

// Why we are keeping the existance of these function.
//
// Well, that's because of the context menus.
//
// TODO remove this bloat function
export function chapterDownloadState({
	id,
	deferred
}: {
	id: string;
	deferred?: boolean;
}): Readable<ChapterDownloadState> {
	const isPresentRaw = isChapterPresentRaw(() => id);
	return derived(
		[
			internalToStore(isPresentRaw),
			chapterDownloadStateRaw({ id, deferred }),
			internalToStore(removeMutation)
		],
		([$isChapterPresentRaw, $rawState, $removeMutation], set) => {
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
				const isPresentData = $isChapterPresentRaw?.data?.data?.downloadState?.chapter;
				if (isPresentData?.hasFailed == true) {
					return ChapterDownloadState.Error;
				} else if (isPresentData?.isDownloaded == true) {
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

export function isChapterDownloaded(param: { id: string; deferred?: boolean }) {
	return derived(
		chapterDownloadState(param),
		(result, set) => {
			// console.debug(ChapterDownloadState[result]);
			set(result === ChapterDownloadState.Done);
		},
		false as boolean
	);
}
