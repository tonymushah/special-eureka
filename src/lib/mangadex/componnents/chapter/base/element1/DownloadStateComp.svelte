<script lang="ts">
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { CheckIcon, DownloadCloudIcon, DownloadIcon, XIcon } from "svelte-feather-icons";
	import type { Readable } from "svelte/store";
	export let download_state: Readable<ChapterDownloadState>;
	$: downloaded = $download_state == ChapterDownloadState.Downloaded;
	$: downloading = $download_state == ChapterDownloadState.Downloading;
	$: failed = $download_state == ChapterDownloadState.Failed;
</script>

<span class:downloaded class:downloading class:failed>
	{#if downloaded}
		<CheckIcon />
	{:else if downloading}
		<DownloadCloudIcon />
	{:else if failed}
		<XIcon />
	{:else}
		<DownloadIcon />
	{/if}
</span>

<style lang="scss">
	.downloading {
		color: var(--indication-blue);
	}
	.failed {
		color: var(--status-yellow);
	}
	.downloaded {
		color: var(--status-green);
	}
</style>
