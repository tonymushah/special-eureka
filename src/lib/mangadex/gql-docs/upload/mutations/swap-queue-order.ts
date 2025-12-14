import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { swapInternalQueueOrderMutationGQLDocs } from "../swap-queue-order";

export function createSwapQueueOrderMutation() {
	return createMutation(
		() => ({
			mutationKey: ["swap", "upload", "queue", "order"],
			async mutationFn({ a, b }: { a: string; b: string }) {
				const res = await client
					.mutation(swapInternalQueueOrderMutationGQLDocs, {
						a,
						b
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
