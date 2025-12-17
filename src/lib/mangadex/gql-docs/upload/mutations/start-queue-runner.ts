import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { startQueueRunnerGQLDocs } from "../start-queue-runner";

export function startQueueRunnerMutation() {
	return createMutation(
		() => ({
			mutationKey: ["start", "upload", "queue", "runner"],
			async mutationFn() {
				const res = await client.mutation(startQueueRunnerGQLDocs, {}).toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}
