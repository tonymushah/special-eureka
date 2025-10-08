import { graphql } from "@mangadex/gql/gql";
import type { MdcustomListsToMyAnimeListExportOption } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const export_mutation = graphql(`
	mutation exportCustomListsToMAL($options: MdcustomListsToMyAnimeListExportOption!) {
		customList {
			export {
				asMyAnimeList(option: $options)
			}
		}
	}
`);

const exportCustomListsToMAL = () => createMutation(() => (
	{
		mutationKey: ["export", "custom-lists", "to", "MAL"],
		async mutationFn(options: MdcustomListsToMyAnimeListExportOption): Promise<string> {
			const res = await client
				.mutation(export_mutation, {
					options
				})
				.toPromise();
			if (res.data) {
				return res.data.customList.export.asMyAnimeList;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("No data??");
			}
		}
	}),
	() => mangadexQueryClient
);

export default exportCustomListsToMAL;
