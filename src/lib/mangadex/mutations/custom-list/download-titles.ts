import { downloadMDListsTitlesGQLDoc } from "@mangadex/gql-docs/list/download-titles";
import type { InputMaybe, MangaDownloadExtras } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export function downloadTitlesCustomListsMutation() {
	return createMutation(
		() => ({
			mutationKey: ["download", "titles", "custom-lists"],
			async mutationFn(params: {
				listIDs: string[];
				extras?: InputMaybe<MangaDownloadExtras>;
				filter?: InputMaybe<boolean>;
			}) {
				const res = await client.mutation(downloadMDListsTitlesGQLDoc, params).toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}
