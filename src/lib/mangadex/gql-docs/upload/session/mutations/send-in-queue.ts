import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { sendInternalSessionInQueueMutationGQLDocs } from "../send-in-queue";

export function sendInternalSessionInQueueMutation() {
	return createMutation(
		() => ({
			mutationKey: ["send", "internal", "session", "in", "queue"],
			async mutationFn(sessionId: string) {
				const res = await client
					.mutation(sendInternalSessionInQueueMutationGQLDocs, {
						sessionId
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
