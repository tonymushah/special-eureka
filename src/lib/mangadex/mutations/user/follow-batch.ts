import {
	followUserBatchGQLDoc,
	unfollowUserBatchGQLDoc
} from "@mangadex/gql-docs/user/follow-batch";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export function unfollowUserBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["unfollow", "user", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(unfollowUserBatchGQLDoc, {
						ids
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}

export function followUserBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["follow", "user", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(followUserBatchGQLDoc, {
						ids
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}
