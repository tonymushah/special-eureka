import { graphql } from "@mangadex/gql/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { save } from "@tauri-apps/plugin-dialog";

export const exportIdsToTxt_mutation = graphql(`
	mutation exportIdsToTxt($uuids: [UUID!]!, $path: String!) {
		export {
			uuidsToAsTxt(file: $path, uuids: $uuids)
		}
	}
`);

const exportIdsToTxt = createMutation(() => (
	{
		mutationKey: ["export", "ids", "as-txt"],
		async mutationFn(options: { uuids: string[]; path?: string }): Promise<string> {
			const path =
				options.path ??
				(await save({
					canCreateDirectories: true,
					title: "Export Uuids as txt",
					filters: [
						{
							name: "txt file",
							extensions: ["txt"]
						}
					]
				}));
			if (typeof path != "string") {
				throw new Error("Invalid file path");
			} else {
				const res = await client
					.mutation(exportIdsToTxt_mutation, {
						uuids: options.uuids,
						path
					})
					.toPromise();
				if (res.data) {
					return res.data.export.uuidsToAsTxt;
				} else if (res.error) {
					throw res.error;
				} else {
					throw new Error("no data??");
				}
			}
		},
		networkMode: "always"
	}),
	() => mangadexQueryClient
);

export default exportIdsToTxt;
