<script lang="ts">
	import { ChapterDownloadState } from "@mangadex/utils/types/DownloadState";
	import { CheckIcon, DownloadCloudIcon, DownloadIcon, XIcon } from "svelte-feather-icons";
	import type { Readable } from "svelte/store";
	interface Props {
		download_state: Readable<ChapterDownloadState>;
	}

	let { download_state }: Props = $props();
	let downloaded = $derived($download_state == ChapterDownloadState.Downloaded);
	let downloading = $derived($download_state == ChapterDownloadState.Downloading);
	let failed = $derived($download_state == ChapterDownloadState.Failed);
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
	span {
		display: flex;
		align-items: center;
		justify-content: center;
	}
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
