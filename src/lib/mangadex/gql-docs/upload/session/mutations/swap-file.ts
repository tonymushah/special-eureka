import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { swapSessionFilesMutationGQLDoc } from "../swap-file";

export function swapFileToInternalSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["swap", "file", "internal"],
			async mutationFn({ sessionId, a, b }: { sessionId: string; a: number; b: number }) {
				const res = await client
					.mutation(swapSessionFilesMutationGQLDoc, {
						sessionId,
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
