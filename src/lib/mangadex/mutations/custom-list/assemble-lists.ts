import { assembleCustomListsTitlesIntoOneGQLDoc } from "@mangadex/gql-docs/list/assemble";
import type { AssembleCustomListsTitlesIntoOneMutationVariables } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export function assembleCustomListsTitlesIntoOneMutation() {
	return createMutation(
		() => ({
			mutationKey: ["assemble", "custom-lists", "into", "one", "list"],
			async mutationFn(param: AssembleCustomListsTitlesIntoOneMutationVariables) {
				const res = await client
					.mutation(assembleCustomListsTitlesIntoOneGQLDoc, param)
					.toPromise();
				if (res.error) {
					throw res.error;
				} else if (res.data) {
					return res.data.customList.assembleCustomListsIntoOne;
				} else {
					throw new Error("no data??");
				}
			}
		}),
		() => mangadexQueryClient
	);
}
