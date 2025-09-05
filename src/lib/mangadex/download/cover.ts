import { graphql } from "@mangadex/gql";
import { debounce } from "lodash";
import { mangadexQueryClient } from "..";
import {
	derived,
	get,
	readable,
	readonly,
	writable,
	type Readable,
	type Writable
} from "svelte/store";
import { createMutation, createQuery, type QueryClient } from "@tanstack/svelte-query";
import { client as gqlClient } from "@mangadex/gql/urql";
import type { OperationResult } from "@urql/svelte";
import {
	CoverDownloadingState,
	type CoverDownloadSubSubscription,
	type CoverDownloadSubSubscriptionVariables
} from "@mangadex/gql/graphql";
import { isMounted } from "@mangadex/stores/offlineIsMounted";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

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

export const invalidateCoverOfflinePresence = debounce(async (id: string) => {
	const queryKey = offlinePresenceQueryKey(id);
	await mangadexQueryClient.invalidateQueries({
		queryKey
	});
});

const downloadStateQuery = (id: string, _client?: QueryClient) => {
	const client = _client ?? mangadexQueryClient;
	const queryKey = offlinePresenceQueryKey(id);
	return createQuery(
		{
			queryKey,
			async queryFn() {
				return await gqlClient
					.query(coverDownloadStateQuery, {
						id
					})
					.toPromise();
			}
		},
		client
	);
};

export const downloadMutationQuery = createMutation(
	{
		mutationKey: ["cover", "download"],
		async mutationFn(id: string) {
			const res = await gqlClient
				.mutation(downloadMutation, {
					id
				})
				.toPromise();
			return res;
		},
		onSettled(data, error, variables, context) {
			invalidateCoverOfflinePresence(variables);
		},
		onError(error, variables, context) {
			addErrorToast(`Cannot download cover art ${variables}`, error);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Downloaded cover art",
					description: variables
				}
			});
		}
	},
	mangadexQueryClient
);

export const removeMutation = createMutation(
	{
		mutationKey: ["cover-removing"],
		async mutationFn(id: string) {
			const res = await gqlClient
				.mutation(coverRemoveMutation, {
					id
				})
				.toPromise();
			return res;
		},
		onSettled(data, error, variables, context) {
			invalidateCoverOfflinePresence(variables)
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: `Removed cover`,
					description: variables
				}
			});
		},
		onError(error, variables, context) {
			addErrorToast(`Cannot remove cover ${variables}`, error);
		},
		networkMode: "always"
	},
	mangadexQueryClient
);

const remove = debounce(async (id: string, _client?: QueryClient) => {
	const client = _client ?? mangadexQueryClient;
	return await get(removeMutation).mutateAsync(id);
});

export const cancelDonwloadMutation = createMutation({
	mutationKey: ["cover", "download", "cancel"],
	async mutationFn(id: string) {
		const res = await gqlClient
			.mutation(cancelDonwloadMuation, {
				id
			})
			.toPromise();
		return res;
	},
	onSettled(data, error, variables, context) {
		invalidateCoverOfflinePresence(variables)
	},
	onSuccess(data, variables, context) {
		addToast({
			data: {
				title: `Removed cover`,
				description: variables
			}
		});
	},
	onError(error, variables, context) {
		addErrorToast(`Cannot remove cover ${variables}`, error);
	},
	networkMode: "always"
}, mangadexQueryClient);

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

export default function coverDownloadState({ id, deferred }: { id: string, deferred?: boolean }): Readable<CoverDownloadState> {
	return derived([downloadStateQuery(id), subOPCover(id, deferred)], ([$query, $state], set) => {
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
				} else if (data.isPending) {
					if ($query.data?.data?.downloadState.cover.hasFailed) {
						return CoverDownloadState.Error;
					} else if ($query.data?.data?.downloadState.cover.isDownloaded) {
						return CoverDownloadState.Done;
					} else {
						return CoverDownloadState.Pending;
					}
				}
			} else if ($state?.error) {
				return CoverDownloadState.Error;
			}
			if ($query.data?.data?.downloadState.cover.hasFailed) {
				return CoverDownloadState.Error;
			} else if ($query.data?.data?.downloadState.cover.isDownloaded) {
				return CoverDownloadState.Done;
			} else {
				return CoverDownloadState.Pending;
			}
		})();
	})
}

export function isCoverDownloading(param: { id: string, deferred?: boolean }) {
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
				break;
		}
	});
}

export function coverDownloadingError({ id, deferred }: { id: string, deferred?: boolean }) {
	return derived(subOPCover(id, deferred), (result) => {
		if (result?.error) {
			return result?.error;
		} else if (result?.data?.watchCoverDownloadState.error) {
			return new Error(result?.data.watchCoverDownloadState.error);
		}
	});
}

export function hasCoverDownloadingFailed(param: { id: string, deferred?: boolean }) {
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

export function isCoverDownloaded(param: { id: string, deferred?: boolean }) {
	return derived(coverDownloadState(param), (result) => {
		switch (result) {
			case CoverDownloadState.Done:
				return true;

			default:
				return false;
		}
	});
}

export class CoverDownload { }
/*
export class CoverDownload {
	private coverId: string;
	protected isPresentInner: Readable<boolean>;
	private reexecute: () => void;
	protected hasFailedInner: Readable<boolean>;
	private isRemoving_: Writable<boolean>;
	protected sub_op: Readable<CoverSubOpType | undefined>;

	constructor(id: string) {
		this.coverId = id;
		const query = downloadStateQuery(id);
		const is_present = derived(query, (res) => res.data);
		this.isPresentInner = derived(is_present, (result) => {
			return result?.data?.downloadState.cover.isDownloaded == true;
		});
		this.reexecute = () => {
			invalidateCoverOfflinePresence(id);
		};
		this.hasFailedInner = derived(is_present, (result) => {
			return result?.data?.downloadState.cover.hasFailed == true;
		});
		this.isRemoving_ = writable(false);
		this.sub_op = subOPCover(id);
	}

	public static deferred(id: string) {
		const _this = new CoverDownload(id);
		_this.sub_op = subOPCover(id, true);
		return _this;
	}

	public get sub_raw_state(): Readable<CoverSubOpType | undefined> {
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

	public get id(): string {
		return this.coverId;
	}

	public state(): Readable<CoverDownloadState> {
		const stores: [
			Readable<CoverSubOpType | undefined>,
			Readable<boolean>,
			Readable<boolean>,
			Readable<boolean>
		] = [this.sub_raw_state, this.hasFailed, this.isPresent, this.isRemoving];
		return derived(stores, ([result, hasFailed, isPresent, removing]) => {
			const res = (() => {
				if (removing) {
					return CoverDownloadState.Removing;
				}
				if (result?.data) {
					const data = result.data.watchCoverDownloadState;
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
					} else if (data.isPending) {
						if (hasFailed) {
							return CoverDownloadState.Error;
						} else if (isPresent) {
							return CoverDownloadState.Done;
						} else {
							return CoverDownloadState.Pending;
						}
					}
				} else if (result?.error) {
					return CoverDownloadState.Error;
				}
				if (hasFailed) {
					return CoverDownloadState.Error;
				} else if (isPresent) {
					return CoverDownloadState.Done;
				} else {
					return CoverDownloadState.Pending;
				}
			})();
			return res;
		});
	}

	public static downloadMutation() {
		return downloadMutation;
	}

	public static cancelDonwloadMuation() {
		return cancelDonwloadMuation;
	}

	public static coverDownloadStateQuery() {
		return coverDownloadStateQuery;
	}

	public static coverDownloadStateSub() {
		return coverDownloadStateSub;
	}

	public static coverRemoveMutation() {
		return coverRemoveMutation;
	}

	public is_downloading() {
		return derived(this.state(), (result) => {
			switch (result) {
				case CoverDownloadState.FetchingData:
					return true;
				case CoverDownloadState.Preloading:
					return true;
				case CoverDownloadState.FetchingImage:
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
			} else if (result?.data?.watchCoverDownloadState.error) {
				return new Error(result?.data.watchCoverDownloadState.error);
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
				case CoverDownloadState.Error:
					return true;
				case CoverDownloadState.Canceled:
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
				case CoverDownloadState.Done:
					return true;

				default:
					return false;
			}
		});
	}
}
*/