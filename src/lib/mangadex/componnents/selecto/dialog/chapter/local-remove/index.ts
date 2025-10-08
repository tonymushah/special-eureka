import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const removeMultipleChapterMutationBase = graphql(`
	mutation removeMultipleChapterMutationBase($id: UUID!) {
		chapter {
			remove(id: $id)
		}
	}
`);

export const removeMultipleChapterMutation = () => createMutation<void, Error, string[]>(() => (
	{
		mutationKey: ["remove", "multitple", "chapters", "localy"],
		async mutationFn(chapters) {
			await Promise.all(
				chapters.map(async (id) => {
					const res = await client
						.mutation(removeMultipleChapterMutationBase, {
							id
						})
						.toPromise();
					if (res.error) {
						throw res.error;
					}
				})
			);
		},
		onSuccess(data, variables, context) {
			addToast({
				data: {
					title: "Removed",
					description: `${variables.length}s chapters removed locally`,
					variant: "primary"
				}
			});
		},
		onError(error, variables, context) {
			addErrorToast("Error on removing chapters", error);
		},
		networkMode: "always"
	}),
	() => mangadexQueryClient
);
