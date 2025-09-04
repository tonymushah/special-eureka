import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import type { ExportCustomListsToCsvOptions } from "@mangadex/gql/graphql";

const export_mutation = graphql(`
	mutation exportCustomListsToCSV($options: ExportCustomListsToCSVOptions!) {
		customList {
			export {
				asCsv(option: $options)
			}
		}
	}
`);

const exportCustomListsToCSV = createMutation(
	{
		mutationKey: ["export", "custom-lists", "to", "CSV"],
		async mutationFn(options: ExportCustomListsToCsvOptions): Promise<string> {
			const res = await client
				.mutation(export_mutation, {
					options
				})
				.toPromise();
			if (res.data) {
				return res.data.customList.export.asCsv;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("No data??");
			}
		}
	},
	mangadexQueryClient
);

export default exportCustomListsToCSV;
