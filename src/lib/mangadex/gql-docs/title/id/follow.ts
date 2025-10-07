import { extractFromAccessor, internalToStore } from "$lib/index.svelte";
import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, createQuery, type CreateQueryResult } from "@tanstack/svelte-query";
import { derived, type Writable, get, toStore } from "svelte/store";

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

export const followTitleMutation = () => createMutation(() => ({
	mutationKey: ["custom-list", "follow"],
	async mutationFn(id: string) {
		const res = await client.mutation(followTitleGQLMutation, {
			id
		}).toPromise();
		if (res.error) {
			throw res.error;
		}
	}
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
	}
}), () => mangadexQueryClient);

export default function isFollowingTitle(id: string, options?: {
	onSettled?: (error: Error | null, variables: string) => void;
	onError?: (error: Error, variables: string) => void;
	onSucess?: (variables: string) => void;
	toast?: boolean
}): Writable<boolean> {
	const toast = options?.toast ?? true;
	const query = () => createQuery(() => ({
		queryKey: ["title", id, "is-following"],
		async queryFn() {
			const res = await client.query(isFollowingTitleQuery, {
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
		using mut = extractFromAccessor(followTitleMutation);
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
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});
	} else {
		using mut = extractFromAccessor(unfollowTitleMutation);
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
				query.refetch();
				options?.onSettled?.(error, variables);
			}
		});
	}
}
