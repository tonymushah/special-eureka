import {
	followGroupBatchGQLDoc,
	unfollowGroupBatchGQLDoc
} from "@mangadex/gql-docs/group/follow-batch";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export function unfollowScanlationGroupBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["unfollow", "scanlation-group", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(unfollowGroupBatchGQLDoc, {
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

export function followScanlationGroupBatchMutation() {
	return createMutation(
		() => ({
			mutationKey: ["follow", "scanlation-group", "batch"],
			async mutationFn(ids: string[]) {
				const res = await client
					.mutation(followGroupBatchGQLDoc, {
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
