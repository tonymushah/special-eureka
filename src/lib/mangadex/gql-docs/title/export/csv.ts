import { graphql } from "@mangadex/gql/gql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import type { ExportIdsLibraryToCsvOptions } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";

const export_mutation = graphql(`
	mutation exportTitlesToCSV($options: ExportIdsLibraryToCSVOptions!) {
		manga {
			export {
				idsAsCsv(options: $options)
			}
		}
	}
`);

const exportTitlesToCSV = createMutation(() => (
	{
		mutationKey: ["export", "titles", "to", "CSV"],
		async mutationFn(options: ExportIdsLibraryToCsvOptions): Promise<string> {
			const res = await client
				.mutation(export_mutation, {
					options
				})
				.toPromise();
			if (res.data) {
				return res.data.manga.export.idsAsCsv;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("No data??");
			}
		}
	}),
	() => mangadexQueryClient
);

export default exportTitlesToCSV;
