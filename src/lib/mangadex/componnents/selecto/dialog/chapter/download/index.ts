import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
import { graphql } from "@mangadex/gql";
import { client } from "@mangadex/gql/urql";
import { mangadexQueryClient } from "@mangadex/index";
import { createMutation } from "@tanstack/svelte-query";

const multiChapterDownloadBase = graphql(`
	mutation multiChapterDownloadBase($id: UUID!) {
		chapter {
			download(id: $id) {
				isDownloaded
				hasFailed
			}
		}
	}
`);

const multiChapterCancelDownloadBase = graphql(`
	mutation multiChapterCancelDownloadBase($id: UUID!) {
		chapter {
			cancelDownload(id: $id)
		}
	}
`);

export const multiChapterDownload = createMutation<void, Error, string[]>({
	mutationKey: ["multi", "download", "chapters"],
	async mutationFn(ids) {
		await Promise.all(ids.map(async (id) => {
			const res = await client.mutation(multiChapterDownloadBase, {
				id
			}).toPromise()
			if (res.error) {
				throw res.error
			} else if (res.data?.chapter.download.hasFailed) {
				throw new Error(`chapter ${id} download failed`);
			}
		}));
	},
	onSuccess(_, ids) {
		addToast({
			data: {
				variant: "primary",
				title: `Downloaded ${ids.length} chapters`
			}
		});
	},
	onError(error, variables, context) {
		addErrorToast("Error on downloading chapters", error);
	},
}, mangadexQueryClient);

export const multiCancelChapterDownload = createMutation<void, Error, string[]>({
	mutationKey: ["multi", "cancel", "download", "chapters"],
	async mutationFn(ids) {
		await Promise.all(ids.map(async (id) => {
			const res = await client.mutation(multiChapterCancelDownloadBase, {
				id
			}).toPromise()
			if (res.error) {
				throw res.error
			}
		}));
	},
	onSuccess(_, ids) {
		addToast({
			data: {
				variant: "yellow",
				title: `${ids.length} chapters download cancelled`
			}
		});
	},
	onError(error, variables, context) {
		addErrorToast("Error on cancelling", error);
	},
}, mangadexQueryClient);
