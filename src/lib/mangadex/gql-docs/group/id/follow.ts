import { extractFromAccessor, internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, get, readonly, writable, type Writable } from "svelte/store";

export const followGroupGQLMutation = graphql(`
	mutation followScanlationGroupMutation($id: UUID!) {
		scanlationGroup {
			follow(id: $id)
		}
	}
`);

export const unfollowGroupGQLMutation = graphql(`
	mutation unfollowScanlationGroupMutation($id: UUID!) {
		scanlationGroup {
			unfollow(id: $id)
		}
	}
`);

export const isFollowingGroupQuery = graphql(`
	query isFollowingScanlationGroupQuery($id: UUID!) {
		follows {
			isFollowingGroup(id: $id)
		}
	}
`);


const globalIsMutatingInner = writable(false);

export const isChangingGroupFollowing = readonly(globalIsMutatingInner);

export const followGroupMutation = () => createMutation(() => ({
	mutationKey: ["scanlation-group", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followGroupGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export const unfollowGroupMutation = () => createMutation(() => ({
	mutationKey: ["scanlation-group", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowGroupGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export default function isFollowingGroup(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = isFollowingGroupQuery_(id);
	const queryDerived = derived(internalToStore(query), ($query) => {
		return $query.data ?? false
	}, false);
	return {
		subscribe(run, invalidate) {
			return queryDerived.subscribe(run, invalidate);
		},
		set(value) {
			using q = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q.value, options);
		},
		update(updater) {
			const value = updater(get(queryDerived));
			using q = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q.value, options);
		}
	};
}

export function isFollowingGroupQuery_(id: string) {
	return () => createQuery(() => ({
		queryKey: ["scanlation-group", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingGroupQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.follows.isFollowingGroup;
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
		using mut_ = extractFromAccessor(followGroupMutation);
		mut_.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change scanlation group following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Followed scanlation group",
							description: id,
							variant: "green"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				query.refetch()
				options?.onSettled?.(error, variables);
			}
		});
	} else {
		using mut = extractFromAccessor(unfollowGroupMutation);
		mut.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change scanlation group following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Unfollowed scanlation group",
							description: id,
							variant: "yellow"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				query.refetch()
				options?.onSettled?.(error, variables);
			}
		});
	}
}
