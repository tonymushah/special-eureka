import { client } from "@mangadex/gql/urql";
import { addToListBatch } from "./query";
import { createMutation } from "@tanstack/svelte-query";
import { mangadexQueryClient } from "@mangadex/index";

const mutation = createMutation<
	void,
	Error,
	{
		customListIds: string[];
		titles: string[];
	}
>(
	{
		mutationKey: ["add", "to", "list", "batch"],
		async mutationFn({ customListIds, titles }) {
			if (customListIds.length == 0 || titles.length == 0) {
				throw new Error("No titles or custom lists selected");
			}
			for (let index = 0; index < customListIds.length; index++) {
				const list = customListIds[index];
				const res = await client
					.mutation(addToListBatch, {
						mangas: titles,
						customList: list
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}
	},
	mangadexQueryClient
);

export default mutation;
