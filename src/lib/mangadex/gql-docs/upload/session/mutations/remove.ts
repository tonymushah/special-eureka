import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { removeInternalSessionMutationGQLDocs } from "../remove";

export function removeInternalSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["remove", "internal", "session"],
			async mutationFn(sessionId: string) {
				const res = await client
					.mutation(removeInternalSessionMutationGQLDocs, {
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
