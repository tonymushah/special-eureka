import { graphql } from "@mangadex/gql/gql";
import { createMutation } from "@tanstack/svelte-query";
import type { ExportMdLibraryToCsvOptions } from "@mangadex/gql/graphql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";

const exportLibraryToCSVMutation = graphql(`
	mutation exportLibraryToCSV($options: ExportMDLibraryToCSVOptions!) {
		library {
			exportAsCsv(options: $options)
		}
	}
`);

export const exportLibraryToCSV = createMutation(
	{
		mutationKey: ["mangadex", "export", "library", "CSV"],
		async mutationFn(options: ExportMdLibraryToCsvOptions): Promise<string> {
			const res = await client
				.mutation(exportLibraryToCSVMutation, {
					options
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.library.exportAsCsv;
			} else {
				throw new Error("No data??");
			}
		}
	},
	mangadexQueryClient
);

export default exportLibraryToCSVMutation;
