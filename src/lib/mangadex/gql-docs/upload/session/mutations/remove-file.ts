import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { removeFileToInternalSessionMutationGQLDocs } from "../remove-file";

export function removeFileToInternalSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["remove", "file", "internal"],
			async mutationFn({ sessionId, path }: { sessionId: string; path: string }) {
				const res = await client
					.mutation(removeFileToInternalSessionMutationGQLDocs, {
						imgPath: path,
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
