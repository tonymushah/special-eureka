import { internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import {
	CoverDownloadingState,
	type CoverDownloadSubSubscription,
	type CoverDownloadSubSubscriptionVariables
} from "@mangadex/gql/graphql";
import { client as gqlClient } from "@mangadex/gql/urql";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import {
	createMutation,
	createQuery,
	type Accessor,
	type QueryClient
} from "@tanstack/svelte-query";
import type { OperationResult } from "@urql/svelte";
import { derived, readable, type Readable } from "svelte/store";
import { mangadexQueryClient } from "..";

const downloadMutation = graphql(`
	mutation downloadCover($id: UUID!) {
		cover {
			download(id: $id) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const cancelDonwloadMuation = graphql(`
	mutation cancelDownloadCover($id: UUID!) {
		cover {
			cancelDownload(id: $id)
		}
	}
`);

const coverDownloadStateQuery = graphql(`
	query coverDownloadState($id: UUID!) {
		downloadState {
			cover(coverId: $id) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const coverDownloadStateSub = graphql(`
	subscription coverDownloadSub($id: UUID!, $deferred: Boolean) {
		watchCoverDownloadState(coverId: $id, deferred: $deferred) {
			isDone
			isPending
			isCanceled
			isOfflineAppStateNotLoaded
			downloading
			error
		}
	}
`);

const coverRemoveMutation = graphql(`
	mutation coverRemoveMutation($id: UUID!) {
		cover {
			remove(id: $id)
		}
	}
`);

export function offlinePresenceQueryKey(id: string) {
	return ["cover", id, "offline-presence"];
}

export const invalidateCoverOfflinePresence = async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.refetchQueries({
		queryKey
	});
};

const downloadStateQuery = (_id: () => string, _client?: () => QueryClient) => {
	const client = _client ?? (() => mangadexQueryClient);

	return () => {
		let id = $derived.by(_id);
		return createQuery(
			() => ({
				queryKey: offlinePresenceQueryKey(id),
				async queryFn() {
					return await gqlClient
						.query(coverDownloadStateQuery, {
							id
						})
						.toPromise();
				}
			}),
			client
		);
	};
};

export const downloadMutationQuery = () =>
	createMutation(
		() => ({
			mutationKey: ["cover", "download"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(downloadMutation, {
						id
					})
					.toPromise();
				return res;
			},
			onSettled(_data, _error, variables) {
				invalidateCoverOfflinePresence(variables);
			},
			onError(error, variables) {
				addErrorToast(`Cannot download cover art ${variables}`, error);
			},
			onSuccess(_data, variables) {
				addToast({
					title: "Downloaded cover art",
					description: variables,
					type: "success"
				});
			}
		}),
		() => mangadexQueryClient
	);

export const removeMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["cover-removing"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(coverRemoveMutation, {
						id
					})
					.toPromise();
				return res;
			},
			onSettled(_data, _error, variables) {
				invalidateCoverOfflinePresence(variables);
			},
			onSuccess(_data, variables) {
				addToast({
					title: `Removed cover`,
					description: variables,
					type: "success"
				});
			},
			onError(error, variables) {
				addErrorToast(`Cannot remove cover ${variables}`, error);
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

export const cancelDonwloadMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["cover", "download", "cancel"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(cancelDonwloadMuation, {
						id
					})
					.toPromise();
				return res;
			},
			onSettled(_data, _error, variables) {
				invalidateCoverOfflinePresence(variables);
			},
			onSuccess(_data, variables) {
				addToast({
					title: `Removed cover`,
					description: variables,
					type: "success"
				});
			},
			onError(error, variables) {
				addErrorToast(`Cannot remove cover ${variables}`, error);
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

export enum CoverDownloadState {
	Pending,
	Done,
	Canceled,
	OfflineAppStateNotLoaded,
	Error,
	Preloading,
	FetchingData,
	FetchingImage,
	Removing
}

function subOPCover(id: string, deferred = false) {
	return readable<CoverSubOpType | undefined>(undefined, (set) => {
		const mount_sub = isMounted.subscribe(() => {
			invalidateCoverOfflinePresence(id)?.catch(console.warn);
		});
		const sub = gqlClient
			.subscription(coverDownloadStateSub, {
				id,
				deferred
			})
			.subscribe((res) => {
				set(res);
				mangadexQueryClient.setQueryData(
					["cover", id, "download-state", "subscription"],
					() => res
				);
				if (
					res.data?.watchCoverDownloadState.isDone ||
					res.data?.watchCoverDownloadState.error ||
					res.data?.watchCoverDownloadState.isCanceled
				) {
					invalidateCoverOfflinePresence(id)?.catch(console.warn);
				}
			});
		return () => {
			sub.unsubscribe();
			mount_sub();
		};
	});
}

type CoverSubOpType = OperationResult<
	CoverDownloadSubSubscription,
	CoverDownloadSubSubscriptionVariables
>;

export function coverDownloadState({
	id,
	deferred
}: {
	id: string;
	deferred?: boolean;
}): Readable<CoverDownloadState> {
	const dState = downloadStateQuery(() => id);
	return derived([internalToStore(dState), subOPCover(id, deferred)], ([$query, $state], _set) => {
		const res = (() => {
			if ($state?.data) {
				const data = $state.data.watchCoverDownloadState;
				if (data.downloading) {
					const downloading = data.downloading;
					switch (downloading) {
						case CoverDownloadingState.FetchingData:
							return CoverDownloadState.FetchingData;
						case CoverDownloadingState.FetchingImage:
							return CoverDownloadState.FetchingImage;
						case CoverDownloadingState.Preloading:
							return CoverDownloadState.Preloading;
						default:
							break;
					}
				} else if (data.error) {
					return CoverDownloadState.Error;
				} else if (data.isCanceled) {
					return CoverDownloadState.Canceled;
				} else if (data.isDone) {
					return CoverDownloadState.Done;
				} else if (data.isOfflineAppStateNotLoaded) {
					return CoverDownloadState.OfflineAppStateNotLoaded;
				}
			} else if ($state?.error) {
				return CoverDownloadState.Error;
			}
			if ($query.data?.data?.downloadState.cover.hasFailed == true) {
				return CoverDownloadState.Error;
			} else if ($query.data?.data?.downloadState.cover.isDownloaded == true) {
				return CoverDownloadState.Done;
			} else {
				return CoverDownloadState.Pending;
			}
		})();
		_set(res);
	});
}

export function isCoverDownloading(param: { id: string; deferred?: boolean }) {
	return derived(coverDownloadState(param), (result) => {
		switch (result) {
			case CoverDownloadState.FetchingData:
				return true;
			case CoverDownloadState.Preloading:
				return true;
			case CoverDownloadState.FetchingImage:
				return true;
			default:
				return false;
		}
	});
}

export function coverDownloadingError({ id, deferred }: { id: string; deferred?: boolean }) {
	return derived(subOPCover(id, deferred), (result) => {
		if (result?.error) {
			return result?.error;
		} else if (result?.data?.watchCoverDownloadState.error) {
			return new Error(result?.data.watchCoverDownloadState.error);
		}
	});
}

export function hasCoverDownloadingFailed(param: { id: string; deferred?: boolean }) {
	return derived(coverDownloadState(param), (result) => {
		switch (result) {
			case CoverDownloadState.Error:
				return true;
			case CoverDownloadState.Canceled:
				return true;
			default:
				return false;
		}
	});
}

export function isCoverDownloaded(param: { id: string; deferred?: boolean }) {
	return derived(coverDownloadState(param), (result) => {
		switch (result) {
			case CoverDownloadState.Done:
				return true;

			default:
				return false;
		}
	});
}

export default class CoverDownload {
	private _state: { value: CoverSubOpType | undefined };
	private _coverId: Accessor<string>;
	private _downloadState: ReturnType<ReturnType<typeof downloadStateQuery>>;
	public constructor(coverId: () => string) {
		this._state = $state({
			value: undefined
		});
		this._coverId = coverId;
		let _state = this._state;
		let id = $derived.by(coverId);
		this._downloadState = downloadStateQuery(coverId)();
		$effect(() => {
			return subOPCover(id).subscribe((res) => {
				_state.value = res;
			});
		});
	}
	public get coverId(): string {
		return this._coverId();
	}
	public get coverDownloadState(): CoverDownloadState {
		if (this._state.value?.data) {
			const data = this._state.value?.data.watchCoverDownloadState;
			if (data.downloading) {
				const downloading = data.downloading;
				switch (downloading) {
					case CoverDownloadingState.FetchingData:
						return CoverDownloadState.FetchingData;
					case CoverDownloadingState.FetchingImage:
						return CoverDownloadState.FetchingImage;
					case CoverDownloadingState.Preloading:
						return CoverDownloadState.Preloading;
					default:
						break;
				}
			} else if (data.error) {
				return CoverDownloadState.Error;
			} else if (data.isCanceled) {
				return CoverDownloadState.Canceled;
			} else if (data.isDone) {
				return CoverDownloadState.Done;
			} else if (data.isOfflineAppStateNotLoaded) {
				return CoverDownloadState.OfflineAppStateNotLoaded;
			}
		} else if (this._state.value?.error) {
			return CoverDownloadState.Error;
		}
		if (this._downloadState.data?.data?.downloadState.cover.hasFailed == true) {
			return CoverDownloadState.Error;
		} else if (this._downloadState.data?.data?.downloadState.cover.isDownloaded == true) {
			return CoverDownloadState.Done;
		} else {
			return CoverDownloadState.Pending;
		}
	}
	public get isCoverDownloading(): boolean {
		switch (this.coverDownloadState) {
			case CoverDownloadState.FetchingData:
				return true;
			case CoverDownloadState.Preloading:
				return true;
			case CoverDownloadState.FetchingImage:
				return true;
			default:
				return false;
		}
	}
	public get coverDownloadingError(): Error | null {
		if (this._state.value?.error) {
			return this._state.value?.error;
		} else if (this._state.value?.data?.watchCoverDownloadState.error) {
			return new Error(this._state.value?.data.watchCoverDownloadState.error);
		} else {
			return null;
		}
	}
	public get hasCoverDownloadingFailed(): boolean {
		switch (this.coverDownloadState) {
			case CoverDownloadState.Error:
				return true;
			case CoverDownloadState.Canceled:
				return true;
			default:
				return false;
		}
	}
	public get isCoverDownloaded(): boolean {
		switch (this.coverDownloadState) {
			case CoverDownloadState.Done:
				return true;

			default:
				return false;
		}
	}
}
