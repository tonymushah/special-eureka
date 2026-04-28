<script lang="ts">
	import ChapterDownload from "@mangadex/download/chapter.svelte";
	import { CheckIcon, CloudDownload, DownloadIcon, XIcon } from "@lucide/svelte";
	interface Props {
		downloadInstance: ChapterDownload;
	}

	let { downloadInstance }: Props = $props();
</script>

<span
	class:downloaded={downloadInstance.isChapterDownloaded}
	class:downloading={downloadInstance.isDownloading}
	class:failed={downloadInstance.hasChapterDownloadingFailed}
>
	{#if downloadInstance.isDownloading}
		<CloudDownload />
	{:else if downloadInstance.hasChapterDownloadingFailed}
		<XIcon />
	{:else if downloadInstance.isChapterDownloaded}
		<CheckIcon />
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
