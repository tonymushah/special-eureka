import { extractFromAccessor, internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, type Writable, get, toStore, readonly, writable } from "svelte/store";

export const followTitleGQLMutation = graphql(`
	mutation followTitleMutation($id: UUID!) {
		manga {
			follow(id: $id)
		}
	}
`);

export const unfollowTitleGQLMutation = graphql(`
	mutation unfollowTitleMutation($id: UUID!) {
		manga {
			unfollow(id: $id)
		}
	}
`);

export const isFollowingTitleQuery = graphql(`
	query isFollowingTitleQuery($id: UUID!) {
		follows {
			isFollowingManga(id: $id)
		}
	}
`);

const globalIsMutatingInner = writable(false);

export const isChangingTitleFollowing = readonly(globalIsMutatingInner);

export const followTitleMutation = () => createMutation(() => ({
	mutationKey: ["custom-list", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followTitleGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	},
	onMutate(variables, context) {
		globalIsMutatingInner.set(true);
	},
	onSettled(data, error, variables, onMutateResult, context) {
		globalIsMutatingInner.set(false);
	},
}), () => mangadexQueryClient);

export const unfollowTitleMutation = () => createMutation(() => ({
	mutationKey: ["title", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowTitleGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	},
	onMutate(variables, context) {
		globalIsMutatingInner.set(true);
	},
	onSettled(data, error, variables, onMutateResult, context) {
		globalIsMutatingInner.set(false);
	},
}), () => mangadexQueryClient);

export default function isFollowingTitle(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = isFollowingTitle_(id);
	const queryDerived = derived(internalToStore(query), ($query) => {
		return $query.data ?? false
	}, false);
	return {
		subscribe(run, invalidate) {
			return queryDerived.subscribe(run, invalidate);
		},
		set(value) {
			using q_ = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q_.value, options);
		},
		update(updater) {
			const value = updater(get(queryDerived));
			using q_ = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q_.value, options);
		}
	};
}

export function isFollowingTitle_(id: string) {
	return () => createQuery(() => ({
		queryKey: ["title", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingTitleQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.follows.isFollowingManga;
			} else {
				throw new Error("no data??");
			}
		}
	}), () => mangadexQueryClient);
}

function setFollowingStatus(
	value: boolean,
	id: string,
	toast: boolean,
	query: CreateQueryResult,
	options:
		| {
			onSettled?: (error: Error | null, variables: string) => void;
			onError?: (error: Error, variables: string) => void;
			onSucess?: (variables: string) => void;
			toast?: boolean;
		}
		| undefined
) {
	if (value) {
		const mut = extractFromAccessor(followTitleMutation);
		mut.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change title following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Followed title",
							description: id,
							variant: "green"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				using _ = mut;
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});

	} else {
		const mut = extractFromAccessor(unfollowTitleMutation);
		mut.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change title following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Unfollowed title",
							description: id,
							variant: "yellow"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				using _ = mut;
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});
	}
}
