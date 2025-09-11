import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, type Writable, get } from "svelte/store";

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
		follows{
			isFollowingGroup(id: $id)
		}
	}
`);

export const followGroupMutation = createMutation({
	mutationKey: ["scanlation-group", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followGroupGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}, mangadexQueryClient);

export const unfollowGroupMutation = createMutation({
	mutationKey: ["scanlation-group", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowGroupGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}, mangadexQueryClient);

export default function isFollowingGroup(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = createQuery({
		queryKey: ["scanlation-group", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingGroupQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			} else {
				return res.data?.follows.isFollowingGroup ?? false
			}
		}
	}, mangadexQueryClient);
	const queryDerived = derived(query, ($query) => {
		return $query.data ?? false
	}, false);
	return {
		subscribe: queryDerived.subscribe,
		set(value) {
			setFollowingStatus(value, id, toast, query, options);
		},
		update(updater) {
			const value = updater(get(queryDerived));
			setFollowingStatus(value, id, toast, query, options);
		},
	}
}

function setFollowingStatus(value: boolean, id: string, toast: boolean, query: CreateQueryResult, options: { onSettled?: (error: Error | null, variables: string) => void; onError?: (error: Error, variables: string) => void; onSucess?: (variables: string) => void; toast?: boolean; } | undefined) {
	if (value) {
		get(followGroupMutation).mutate(id, {
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
				get(query).refetch()
				options?.onSettled?.(error, variables);
			},
		});
	} else {
		get(unfollowGroupMutation).mutate(id, {
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
				get(query).refetch()
				options?.onSettled?.(error, variables);
			},
		});
	}
}
