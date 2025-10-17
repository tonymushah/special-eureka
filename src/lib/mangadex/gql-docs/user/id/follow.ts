import { extractFromAccessor, internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, get, readonly, writable, type Writable } from "svelte/store";

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

const globalIsMutatingInner = writable(false);

export const isChangingUserFollowing = readonly(globalIsMutatingInner);

export const followUserMutation = () => createMutation(() => ({
	mutationKey: ["user", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followUserGQLMutation, {
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

export const unfollowUserMutation = () => createMutation(() => ({
	mutationKey: ["user", "unfollow"],
	async mutationFn(id: string) {
		const res = await client.mutation(unfollowUserGQLMutation, {
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

export default function isFollowingUser(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = isFollowingUserQuery_(id);
	const queryDerived = derived(internalToStore(query), (query) => {
		return query.data ?? false
	}, false);
	return {
		subscribe(run, invalidate) {
			return queryDerived.subscribe(run, invalidate);
		},
		set(value) {
			const q_ = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q_.value, options);
		},
		update(updater) {
			const value = updater(get(queryDerived));
			using q_ = extractFromAccessor(query);
			setFollowingStatus(value, id, toast, q_.value, options);
		}
	};
}

export function isFollowingUserQuery_(id: string) {
	return () => createQuery(() => ({
		queryKey: ["user", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingUserQuery, {
				id
			}).toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.follows.isFollowingUser;
			} else {
				throw new Error("no data???");
			}
		},
	}), () => mangadexQueryClient);
}

function setFollowingStatus(
	value: boolean,
	id: string,
	toast: boolean,
	query: CreateQueryResult,
	options?: {
		onSettled?: (error: Error | null, variables: string) => void;
		onError?: (error: Error, variables: string) => void;
		onSucess?: (variables: string) => void;
		toast?: boolean;
	}) {
	if (value) {
		const mut = extractFromAccessor(followUserMutation);

		mut.value.mutate(id, {
			onError(error, variables, context) {
				query.refetch();
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
				query.refetch();
				options?.onSucess?.(variables);
			},
			onSettled(data, error, variables, context) {
				query.refetch();
				options?.onSettled?.(error, variables);
				using _ = mut;
			}
		})

	} else {
		const mut = extractFromAccessor(unfollowUserMutation);
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
				using _ = mut;
			}
		});
	}
}
