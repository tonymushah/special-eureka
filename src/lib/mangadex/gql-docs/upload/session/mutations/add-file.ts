import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";
import { open } from "@tauri-apps/plugin-dialog";
import { addFileToInternalSessionMutationGQLDocs } from "../add-file";

export function addFileToInternalSessionMutation() {
	return createMutation(
		() => ({
			mutationKey: ["add", "file", "internal"],
			async mutationFn({ sessionId, path }: { sessionId: string; path?: string }) {
				let toImport: string;
				if (path) {
					toImport = path;
				} else {
					const res = await open({
						multiple: false,
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
						toImport = res;
					}
				}
				const res = await client
					.mutation(addFileToInternalSessionMutationGQLDocs, {
						sessionId,
						imgPath: toImport
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
