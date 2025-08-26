import { graphql } from "@mangadex/gql/gql";
import { createMutation } from "@tanstack/svelte-query";
import type { MdlibraryToMyAnimeListExportOption } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";

const exportLibraryToMyAnimeListMutation = graphql(`
	mutation exportLibraryToMyAnimeList($options: MdlibraryToMyAnimeListExportOption!) {
		library {
			exportAsMyAnimeList(options: $options)
		}
	}
`);

export default exportLibraryToMyAnimeListMutation;

export const exportLibraryToMyAnimeList = createMutation({
	mutationKey: ["mangadex", "export", "library", "MyAnimeList"],
	async mutationFn(options: MdlibraryToMyAnimeListExportOption): Promise<string> {
		const res = await client.mutation(exportLibraryToMyAnimeListMutation, {
			options
		}).toPromise();
		if (res.error) {
			throw res.error;
		} else if (res.data) {
			return res.data.library.exportAsMyAnimeList;
		} else {
			throw new Error("No data??");
		}
	},
});