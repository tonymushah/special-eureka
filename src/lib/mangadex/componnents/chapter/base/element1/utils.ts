import { extractFromAccessor } from "$lib/index.svelte";
import { cancelDownloadMutation, downloadMutation } from "@mangadex/download/chapter";

export async function downloadChapter(id: string) {
	using mut = extractFromAccessor(downloadMutation);
	await mut.value.mutateAsync({ id });
}

export async function cancelChapterDownload(id: string) {
	using mut = extractFromAccessor(cancelDownloadMutation);
	await mut.value.mutateAsync(id);
}