import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import type {
	MangaDownloadSubSubscription,
	MangaDownloadSubSubscriptionVariables
} from "@mangadex/gql/graphql";
import { client as gqlClient } from "@mangadex/gql/urql";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { createMutation, createQuery, type QueryClient } from "@tanstack/svelte-query";
import type { OperationResult } from "@urql/svelte";
import {
	derived,
	readable,
	toStore,
	type Readable
} from "svelte/store";
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

export const invalidateMangaOfflinePresence = (async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.refetchQueries({
		queryKey
	});
});

export const downloadMutationQuery = createMutation(() => (
	{
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
		onSettled(data, error, variables, context) {
			invalidateMangaOfflinePresence(variables);
		},
		onError(error, variables, context) {
			addErrorToast("Error on downloading title", error);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Downloaded title",
					description: variables
				}
			});
		}
	}),
	() => mangadexQueryClient
);

export const removeMutation = createMutation(() => (
	{
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
		onSettled(data, error, variables, context) {
			invalidateMangaOfflinePresence(variables)
		},
		onError(error, variables, context) {
			addErrorToast("Cannot remove title", error);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Removed title",
					description: variables
				}
			});
		},
		networkMode: "always"
	}),
	() => mangadexQueryClient
);

export const cancelMutation = createMutation(() => (
	{
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
		onSettled(data, error, variables, context) {
			invalidateMangaOfflinePresence(variables)
		},
		onError(error, variables, context) {
			addErrorToast("Cannot cancel download", error);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Canceled download title",
					description: variables
				}
			});
		},
		networkMode: "always"
	}),
	() => mangadexQueryClient
);

const downloadStateQuery = (id: string, _client?: QueryClient) => {
	const client = _client ?? mangadexQueryClient;
	const queryKey = offlinePresenceQueryKey(id);
	return createQuery(() => (
		{
			queryKey,
			async queryFn() {
				return await gqlClient
					.query(mangaDownloadStateQuery, {
						id
					})
					.toPromise();
			}
		}),
		() => client
	);
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

export default function mangaDownloadState({ id, deferred }: { id: string, deferred?: boolean }): Readable<MangaDownloadState> {
	const dState = downloadStateQuery(id);
	return derived([subOpManga(id, deferred), toStore(() => dState)], ([$sub, $initState], set) => {
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
				} else if (data.isPending) {
					if ($initState.data?.error || $initState.error || $initState.data?.data?.downloadState.manga.hasFailed) {
						return MangaDownloadState.Error;
					} else if ($initState.data?.data?.downloadState.manga) {
						return MangaDownloadState.Done;
					} else {
						return MangaDownloadState.Pending;
					}
				}
			} else if ($sub?.error) {
				return MangaDownloadState.Error;
			}
			if ($initState.data?.error || $initState.error || $initState.data?.data?.downloadState.manga.hasFailed) {
				return MangaDownloadState.Error;
			} else if ($initState.data?.data?.downloadState.manga) {
				return MangaDownloadState.Done;
			} else {
				return MangaDownloadState.Pending;
			}
		})();
		set(res);
	}, MangaDownloadState.Pending as MangaDownloadState);
}

export function isMangaDownloading(param: { id: string, deferred?: boolean }): Readable<boolean> {
	return derived(mangaDownloadState(param), (result) => {
		switch (result) {
			case MangaDownloadState.Downloading:
				return true;
			default:
				return false;
				break;
		}
	}, false);
}

export function mangaDownloadingError(param: { id: string, deferred?: boolean }): Readable<Error | undefined> {
	return derived(subOpManga(param.id, param.deferred), (result) => {
		if (result?.error) {
			return result?.error;
		} else if (result?.data?.watchMangaDownloadState.error) {
			return new Error(result?.data.watchMangaDownloadState.error);
		}
	});
}

export function isMangaDownloaded(param: { id: string, deferred?: boolean }) {
	return derived(mangaDownloadState(param), (result) => {
		switch (result) {
			case MangaDownloadState.Done:
				return true;

			default:
				return false;
		}
	}, false);
}

export function hasMangaDownloadingFailed(param: { id: string, deferred?: boolean }) {
	return derived(mangaDownloadState(param), (result) => {
		switch (result) {
			case MangaDownloadState.Error:
				return true;
			case MangaDownloadState.Canceled:
				return true;
			default:
				return false;
		}
	}, false);
}

/*
export class MangaDownload {
	private mangaId: string;
	protected isPresentInner: Readable<boolean>;
	private reexecute: () => void;
	protected hasFailedInner: Readable<boolean>;
	private isRemoving_: Writable<boolean>;
	protected sub_op: Readable<MangaSubOpType | undefined>;

	constructor(id: string) {
		this.mangaId = id;
		const query = downloadStateQuery(id);
		const is_present = derived(query, (res) => res.data);
		this.isPresentInner = derived(is_present, (result) => {
			return result?.data?.downloadState.manga.isDownloaded == true;
		});
		this.reexecute = () => {
			invalidateMangaOfflinePresence(id);
		};
		this.hasFailedInner = derived(is_present, (result) => {
			return result?.data?.downloadState.manga.hasFailed == true;
		});
		this.isRemoving_ = writable(false);
		this.sub_op = subOpManga(id);
	}

	public static deferred(id: string) {
		const _this = new MangaDownload(id);
		_this.sub_op = subOpManga(id);
		return _this;
	}

	public get id(): string {
		return this.mangaId;
	}

	public static downloadMutation() {
		return downloadMutation;
	}

	public static cancelDonwloadMuation() {
		return cancelDonwloadMuation;
	}

	public static mangaDownloadStateQuery() {
		return mangaDownloadStateQuery;
	}

	public static mangaDownloadStateSub() {
		return mangaDownloadStateSub;
	}

	public static mangaRemoveMutation() {
		return mangaRemoveMutation;
	}

	public get sub_raw_state(): Readable<MangaSubOpType | undefined> {
		return this.sub_op;
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

	public state(): Readable<MangaDownloadState> {
		const stores: [
			Readable<MangaSubOpType | undefined>,
			Readable<boolean>,
			Readable<boolean>,
			Readable<boolean>
		] = [this.sub_raw_state, this.hasFailed, this.isPresent, this.isRemoving];
		return derived(stores, ([result, hasFailed, isPresent, removing]) => {
			const res = (() => {
				if (removing) {
					return MangaDownloadState.Removing;
				}
				if (result?.data) {
					const data = result.data.watchMangaDownloadState;
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
					} else if (data.isPending) {
						if (hasFailed) {
							return MangaDownloadState.Error;
						} else if (isPresent) {
							return MangaDownloadState.Done;
						} else {
							return MangaDownloadState.Pending;
						}
					}
				} else if (result?.error) {
					return MangaDownloadState.Error;
				}
				if (hasFailed) {
					return MangaDownloadState.Error;
				} else if (isPresent) {
					return MangaDownloadState.Done;
				} else {
					return MangaDownloadState.Pending;
				}
			})();
			return res;
		});
	}
	public is_downloading() {
		return derived(this.state(), (result) => {
			switch (result) {
				case MangaDownloadState.Downloading:
					return true;
				default:
					return false;
					break;
			}
		});
	}
	public error() {
		return derived(this.sub_raw_state, (result) => {
			if (result?.error) {
				return result?.error;
			} else if (result?.data?.watchMangaDownloadState.error) {
				return new Error(result?.data.watchMangaDownloadState.error);
			}
		});
	}
	public async download() {
		const id = this.id;
		const data = await download(id);
		return data;
	}
	public async remove() {
		return await remove(this.id);
	}
	public has_failed() {
		return derived(this.state(), (result) => {
			switch (result) {
				case MangaDownloadState.Error:
					return true;
				case MangaDownloadState.Canceled:
					return true;
				default:
					return false;
			}
		});
	}
	public async cancel() {
		return await cancel(this.id);
	}
	public is_downloaded() {
		return derived(this.state(), (result) => {
			switch (result) {
				case MangaDownloadState.Done:
					return true;

				default:
					return false;
			}
		});
	}
}
*/
