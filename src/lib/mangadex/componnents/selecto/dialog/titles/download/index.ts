import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const mutation = graphql(`
	mutation justDownloadingTitle($id: UUID!) {
		manga {
			download(id: $id) {
				isDownloaded
				hasFailed
			}
		}
	}
`);

export const titlesDownload = createMutation<void, Error, string[]>(() => (
	{
		mutationKey: ["titles", "download"],
		async mutationFn(titles) {
			const all_res = await Promise.allSettled(
				titles.map(async (id) => {
					const res = await client.mutation(mutation, { id });
					if (res.error) {
						throw res.error;
					}
					if (res.data?.manga.download.hasFailed) {
						throw new Error(`${id} has failed`);
					}
				})
			);
			all_res.forEach((res) => {
				switch (res.status) {
					case "rejected":
						throw res.reason;
						break;
					default:
						break;
				}
			});
		},
		networkMode: "always"
	}),
	() => mangadexQueryClient
);
