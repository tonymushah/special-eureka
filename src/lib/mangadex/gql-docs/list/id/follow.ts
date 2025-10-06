import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, get, toStore, type Writable } from "svelte/store";

export const followCustomListGQLMutation = graphql(`
	mutation followCustomListMutation($id: UUID!) {
		customList {
			follow(id: $id)
		}
	}
`);

export const unfollowCustomListGQLMutation = graphql(`
	mutation unfollowCustomListMutation($id: UUID!) {
		customList {
			unfollow(id: $id)
		}
	}
`);

export const isFollowingCustomListQuery = graphql(`
	query isFollowingCustomListQuery($id: UUID!) {
		follows {
			isFollowingCustomList(id: $id)
		}
	}
`);

export const followCustomListMutation = createMutation(() => ({
	mutationKey: ["custom-list", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followCustomListGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export const unfollowCustomListMutation = createMutation(() => ({
	mutationKey: ["custom-list", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowCustomListGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export default function isFollowingCustomList(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = createQuery(() => ({
		queryKey: ["custom-list", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingCustomListQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			}
		}
	}), () => mangadexQueryClient);
	const queryDerived = derived(toStore(() => query), ($query) => {
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
		}
	};
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
		followCustomListMutation.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change custom list following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Followed custom list",
							description: id,
							variant: "green"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});
	} else {
		unfollowCustomListMutation.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change custom list following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Unfollowed custom list",
							description: id,
							variant: "yellow"
						}
					});
				}
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});
	}
}
