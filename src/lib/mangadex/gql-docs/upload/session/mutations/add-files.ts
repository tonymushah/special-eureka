import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { open } from "@tauri-apps/plugin-dialog";
import { addFilesToInternalSessionMutationGQLDocs } from "../add-files";

export function addFilesToInternalSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["add", "files", "internal"],
			async mutationFn({ sessionId, paths }: { sessionId: string; paths?: string[] }) {
				let toImports: string[];
				if (paths) {
					toImports = paths;
				} else {
					const res = await open({
						multiple: true,
						directory: false,
						filters: [
							{
								name: "Image",
								extensions: ["jpeg", "jpg", "png", "gif"]
							}
						]
					});
					if (res == null) {
						throw new Error("Please select a file");
					} else {
						toImports = res;
					}
				}
				const res = await client
					.mutation(addFilesToInternalSessionMutationGQLDocs, {
						sessionId,
						imgPaths: toImports
					})
					.toPromise();
				if (res.error) {
					throw res.error;
				}
			}
		}),
		() => mangadexQueryClient
	);
}
