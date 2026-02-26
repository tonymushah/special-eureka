import { downloadMDListsTitlesGQLDoc } from "@mangadex/gql-docs/list/download-titles";
import type { InputMaybe, MangaDownloadExtras } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

export type DownloadTitlesCustomListsParam = {
	listIDs: string[];
	extras?: InputMaybe<MangaDownloadExtras>;
	filter?: InputMaybe<boolean>;
};

export function downloadTitlesCustomListsMutation() {
	return createMutation(
		() => ({
			mutationKey: ["download", "titles", "custom-lists"],
			async mutationFn(params: DownloadTitlesCustomListsParam) {
				return await downloadTitlesCustomLists(params);
			}
		}),
		() => mangadexQueryClient
	);
}

export async function downloadTitlesCustomLists(params: DownloadTitlesCustomListsParam) {
	const res = await client.mutation(downloadMDListsTitlesGQLDoc, params).toPromise();
	if (res.error) {
		throw res.error;
	} else if (res.data) {
		return res.data.customList.downloadListTitles;
	} else {
		throw new Error("No data");
	}
}
