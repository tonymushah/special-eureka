import {
	followMDListBatchGQLDoc,
	unfollowMDListBatchGQLDoc
} from "@mangadex/gql-docs/list/follow-batch";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export function unfollowCustomlistBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["unfollow", "custom-list", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(unfollowMDListBatchGQLDoc, {
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

export function followCustomlistBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["follow", "custom-list", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(followMDListBatchGQLDoc, {
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
