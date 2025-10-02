import { mutateReadMarkersBatch } from "@mangadex/gql-docs/read-markers/chapters";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export const readMarkers = createMutation(
	{
		mutationKey: ["readmarkers", "update"],
		async mutationFn({
			reads,
			unreads,
			updateHistory
		}: {
			reads: string[];
			unreads: string[];
			updateHistory?: boolean;
		}) {
			const res = await client.mutation(mutateReadMarkersBatch, {
				read: reads,
				unreads: unreads,
				updateHistory
			});
			if (res.error) {
				throw res.error;
			}
		}
	},
	mangadexQueryClient
);
