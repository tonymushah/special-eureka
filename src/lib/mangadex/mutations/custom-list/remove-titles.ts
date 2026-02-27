import { removeTitlesFromCustomListMutationGQLDoc } from "@mangadex/gql-docs/list/remove-title-batch";
import { client } from "@mangadex/gql/urql";
import { createMutation } from "@tanstack/svelte-query";

export function removeTitlesFromCustomListMutation() {
	return createMutation(() => ({
		mutationKey: ["remove", "titles", "from", "custom-list"],
		async mutationFn({ titlesIds, customListId }: { titlesIds: string[]; customListId: string }) {
			const res = await client
				.mutation(removeTitlesFromCustomListMutationGQLDoc, {
					titlesIds,
					customListId
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.customList.removeMangaBatch;
			} else {
				throw new Error("unreachable!!!");
			}
		}
	}));
}
