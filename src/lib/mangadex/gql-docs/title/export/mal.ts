import { graphql } from "@mangadex/gql/gql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import type { MdidsToMyAnimeListExportOption } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";

const export_mutation = graphql(`
	mutation exportTitlesToMAL($options: MdidsToMyAnimeListExportOption!) {
		manga {
			export {
				idsAsMyAnimeList(options: $options)
			}
		}
	}
`);

const exportTitlesToMAL = () => createMutation(() => (
	{
		mutationKey: ["export", "titles", "to", "MAL"],
		async mutationFn(options: MdidsToMyAnimeListExportOption): Promise<string> {
			const res = await client
				.mutation(export_mutation, {
					options
				})
				.toPromise();
			if (res.data) {
				return res.data.manga.export.idsAsMyAnimeList;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("No data??");
			}
		}
	}),
	() => mangadexQueryClient
);

export default exportTitlesToMAL;
