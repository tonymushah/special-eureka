import { extractFromAccessor, internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, get, toStore, type Writable } from "svelte/store";

export const followUserGQLMutation = graphql(`
	mutation followUserMutation($id: UUID!) {
		user {
			follow(id: $id)
		}
	}
`);

export const unfollowUserGQLMutation = graphql(`
	mutation unfollowUserMutation($id: UUID!) {
		user {
			unfollow(id: $id)
		}
	}
`);

export const isFollowingUserQuery = graphql(`
	query isFollowingUserQuery($id: UUID!) {
		follows {
			isFollowingUser(id: $id)
		}
	}
`);

export const followUserMutation = () => createMutation(() => ({
	mutationKey: ["user", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followUserGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export const unfollowUserMutation = () => createMutation(() => ({
	mutationKey: ["user", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowUserGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
}), () => mangadexQueryClient);

export default function isFollowingUser(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = () => createQuery(() => ({
		queryKey: ["user", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingUserQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			}
		}
	}), () => mangadexQueryClient);
	const queryDerived = derived(internalToStore(query), ($query) => {
		return $query.data ?? false
	}, false);
	return {
		subscribe: queryDerived.subscribe,
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
		using mut = extractFromAccessor(followUserMutation);
		mut.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change user following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Followed user",
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
		using mut = extractFromAccessor(unfollowUserMutation);
		mut.value.mutate(id, {
			onError(error, variables, context) {
				if (toast) {
					addErrorToast("Cannot change user following status", error);
				}
				options?.onError?.(error, variables);
			},
			onSuccess(data, variables, context) {
				if (toast) {
					addToast({
						data: {
							title: "Unfollowed user",
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
