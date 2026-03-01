<script lang="ts">
	import ChapterDownload from "@mangadex/download/chapter.svelte";
	import { CheckIcon, DownloadCloudIcon, DownloadIcon, XIcon } from "@lucide/svelte";
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	let downloadInstance = new ChapterDownload(() => id);
</script>

<span
	class:downloaded={downloadInstance.isChapterDownloaded}
	class:downloading={downloadInstance.isDownloading}
	class:failed={downloadInstance.hasChapterDownloadingFailed}
>
	{#if downloadInstance.isDownloading}
		<DownloadCloudIcon />
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
