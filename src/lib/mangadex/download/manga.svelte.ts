import { internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import type {
	MangaDownloadSubSubscription,
	MangaDownloadSubSubscriptionVariables
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
import { untrack } from "svelte";
import { derived, readable, type Readable } from "svelte/store";
import { mangadexQueryClient } from "..";

const downloadMutation = graphql(`
	mutation downloadManga($id: UUID!) {
		manga {
			download(id: $id) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const cancelDonwloadMuation = graphql(`
	mutation cancelDownloadManga($id: UUID!) {
		manga {
			cancelDownload(id: $id)
		}
	}
`);

const mangaDownloadStateQuery = graphql(`
	query mangaDownloadState($id: UUID!) {
		downloadState {
			manga(mangaId: $id) {
				hasFailed
				isDownloaded
			}
		}
	}
`);

const mangaDownloadStateSub = graphql(`
	subscription mangaDownloadSub($id: UUID!, $deferred: Boolean) {
		watchMangaDownloadState(mangaId: $id, deferred: $deferred) {
			isDone
			isPending
			isCanceled
			isOfflineAppStateNotLoaded
			downloading
			error
		}
	}
`);

const mangaRemoveMutation = graphql(`
	mutation mangaRemoveMutation($id: UUID!) {
		manga {
			remove(id: $id)
		}
	}
`);

export function offlinePresenceQueryKey(id: string) {
	return ["manga", id, "offline-presence"];
}

export const invalidateMangaOfflinePresence = async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.refetchQueries({
		queryKey
	});
};

export const downloadMutationQuery = () =>
	createMutation(
		() => ({
			mutationKey: ["manga", "download"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(downloadMutation, {
						id
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
				return res;
			},
			onSettled(data, error, variables) {
				invalidateMangaOfflinePresence(variables);
			},
			onError(error) {
				addErrorToast("Error on downloading title", error);
			},
			onSuccess(data, variables) {
				addToast({
					title: "Downloaded title",
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
			mutationKey: ["manga-removing"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(mangaRemoveMutation, {
						id
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
				return res;
			},
			onSettled(data, error, variables) {
				invalidateMangaOfflinePresence(variables);
			},
			onError(error) {
				addErrorToast("Cannot remove title", error);
			},
			onSuccess(data, variables) {
				addToast({
					title: "Removed title",
					description: variables,
					type: "success"
				});
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

export const cancelMutation = () =>
	createMutation(
		() => ({
			mutationKey: ["manga", "download", "cancel"],
			async mutationFn(id: string) {
				const res = await gqlClient
					.mutation(cancelDonwloadMuation, {
						id
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
				return res;
			},
			onSettled(data, error, variables) {
				invalidateMangaOfflinePresence(variables);
			},
			onError(error) {
				addErrorToast("Cannot cancel download", error);
			},
			onSuccess(data, variables) {
				addToast({
					title: "Canceled download title",
					description: variables,
					type: "success"
				});
			},
			networkMode: "always"
		}),
		() => mangadexQueryClient
	);

const downloadStateQuery = (_id: () => string, _client?: () => QueryClient) => {
	const client = _client ?? (() => mangadexQueryClient);

	return () => {
		let id = $derived.by(_id);
		let queryKey = $derived.by(() => offlinePresenceQueryKey(id));
		return createQuery(
			() => ({
				queryKey,
				async queryFn() {
					return await gqlClient
						.query(mangaDownloadStateQuery, {
							id
						})
						.toPromise();
				}
			}),
			client
		);
	};
};

export enum MangaDownloadState {
	Pending,
	Done,
	Canceled,
	OfflineAppStateNotLoaded,
	Error,
	Downloading,
	Removing
}

type MangaSubOpType = OperationResult<
	MangaDownloadSubSubscription,
	MangaDownloadSubSubscriptionVariables
>;

function subOpManga(id: string, deferred = false) {
	return readable<MangaSubOpType | undefined>(undefined, (set) => {
		const mount_sub = isMounted.subscribe(() => {
			invalidateMangaOfflinePresence(id)?.catch(console.warn);
		});
		const sub = gqlClient
			.subscription(mangaDownloadStateSub, {
				id,
				deferred
			})
			.subscribe((res) => {
				set(res);
				mangadexQueryClient.setQueryData(
					["manga", id, "download-state", "subscription"],
					() => res
				);
				if (
					res.data?.watchMangaDownloadState.isDone ||
					res.data?.watchMangaDownloadState.error ||
					res.data?.watchMangaDownloadState.isCanceled
				) {
					invalidateMangaOfflinePresence(id)?.catch(console.warn);
				}
			});
		return () => {
			sub.unsubscribe();
			mount_sub();
		};
	});
}

export function mangaDownloadState({
	id,
	deferred
}: {
	id: string;
	deferred?: boolean;
}): Readable<MangaDownloadState> {
	const dState = downloadStateQuery(() => id);
	return derived(
		[subOpManga(id, deferred), internalToStore(dState)],
		([$sub, $initState], set) => {
			const res = (() => {
				if ($sub?.data) {
					const data = $sub.data.watchMangaDownloadState;
					if (data.downloading) {
						return MangaDownloadState.Downloading;
					} else if (data.error) {
						return MangaDownloadState.Error;
					} else if (data.isCanceled) {
						return MangaDownloadState.Canceled;
					} else if (data.isDone) {
						return MangaDownloadState.Done;
					} else if (data.isOfflineAppStateNotLoaded) {
						return MangaDownloadState.OfflineAppStateNotLoaded;
					}
				} else if ($sub?.error) {
					return MangaDownloadState.Error;
				}
				if (
					$initState?.data?.error != undefined ||
					$initState?.error != null ||
					$initState?.data?.data?.downloadState.manga.hasFailed == true
				) {
					return MangaDownloadState.Error;
				} else if ($initState?.data?.data?.downloadState.manga.isDownloaded == true) {
					return MangaDownloadState.Done;
				} else {
					return MangaDownloadState.Pending;
				}
			})();
			set(res);
		},
		MangaDownloadState.Pending as MangaDownloadState
	);
}

export function isMangaDownloading(param: { id: string; deferred?: boolean }): Readable<boolean> {
	return derived(
		mangaDownloadState(param),
		(result) => {
			switch (result) {
				case MangaDownloadState.Downloading:
					return true;
				default:
					return false;
					break;
			}
		},
		false
	);
}

export function mangaDownloadingError(param: {
	id: string;
	deferred?: boolean;
}): Readable<Error | undefined> {
	return derived(subOpManga(param.id, param.deferred), (result) => {
		if (result?.error) {
			return result?.error;
		} else if (result?.data?.watchMangaDownloadState.error) {
			return new Error(result?.data.watchMangaDownloadState.error);
		}
	});
}

export function isMangaDownloaded(param: { id: string; deferred?: boolean }) {
	return derived(
		mangaDownloadState(param),
		(result) => {
			switch (result) {
				case MangaDownloadState.Done:
					return true;

				default:
					return false;
			}
		},
		false
	);
}

export function hasMangaDownloadingFailed(param: { id: string; deferred?: boolean }) {
	return derived(
		mangaDownloadState(param),
		(result) => {
			switch (result) {
				case MangaDownloadState.Error:
					return true;
				case MangaDownloadState.Canceled:
					return true;
				default:
					return false;
			}
		},
		false
	);
}

export default class MangaDownload {
	private _state: { value: MangaSubOpType | null };
	private _mangaId: Accessor<string>;
	private _download_state: ReturnType<ReturnType<typeof downloadStateQuery>>;
	public constructor(mangaId: () => string) {
		let _state = $state<{ value: MangaSubOpType | null }>({ value: null });
		this._mangaId = mangaId;
		this._state = $derived(_state);
		this._download_state = downloadStateQuery(mangaId)();
		$effect(() => {
			let id = $derived.by(mangaId);
			return subOpManga(id).subscribe((res) => {
				if (untrack(() => _state)) _state.value = res ?? null;
			});
		});
	}
	public get mangaId(): string {
		return this._mangaId();
	}
	public get mangaDownloadState(): MangaDownloadState {
		if (this._state.value?.data) {
			const data = this._state.value?.data.watchMangaDownloadState;
			if (data.downloading) {
				return MangaDownloadState.Downloading;
			} else if (data.error) {
				return MangaDownloadState.Error;
			} else if (data.isCanceled) {
				return MangaDownloadState.Canceled;
			} else if (data.isDone) {
				return MangaDownloadState.Done;
			} else if (data.isOfflineAppStateNotLoaded) {
				return MangaDownloadState.OfflineAppStateNotLoaded;
			}
		} else if (this._state.value?.error) {
			return MangaDownloadState.Error;
		}
		if (
			this._download_state.data?.error != undefined ||
			this._download_state.error != null ||
			this._download_state.data?.data?.downloadState.manga.hasFailed == true
		) {
			return MangaDownloadState.Error;
		} else if (this._download_state.data?.data?.downloadState.manga.isDownloaded == true) {
			return MangaDownloadState.Done;
		} else {
			return MangaDownloadState.Pending;
		}
	}
	public get isMangaDownloading(): boolean {
		switch (this.mangaDownloadState) {
			case MangaDownloadState.Downloading:
				return true;
			default:
				return false;
				break;
		}
	}
	public get mangaDownloadingError(): Error | null {
		if (this._state.value?.error) {
			return this._state.value.error;
		} else if (this._state.value?.data?.watchMangaDownloadState.error) {
			return new Error(this._state.value?.data.watchMangaDownloadState.error);
		} else {
			return null;
		}
	}
	public get isMangaDownloaded(): boolean {
		switch (this.mangaDownloadState) {
			case MangaDownloadState.Done:
				return true;

			default:
				return false;
		}
	}
	public get hasMangaDownloadingFailed(): boolean {
		switch (this.mangaDownloadState) {
			case MangaDownloadState.Error:
				return true;
			case MangaDownloadState.Canceled:
				return true;
			default:
				return false;
		}
	}
}
