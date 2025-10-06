import { mutateReadMarkersBatch } from "@mangadex/gql-docs/read-markers/chapters";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation, type MutationFunction } from "@tanstack/svelte-query";

export const readMarkers = createMutation(() => ({
	mutationKey: ["readmarkers", "update"],
	mutationFn: (async ({ reads, unreads, updateHistory }) => {
		const res = await client.mutation(mutateReadMarkersBatch, {
			read: reads,
			unreads: unreads,
			updateHistory
		});
		if (res.error) {
			throw res.error;
		}
	}) satisfies MutationFunction<unknown, {
		reads: string[],
		unreads: string[],
		updateHistory?: boolean
	}>
}), () => mangadexQueryClient);
