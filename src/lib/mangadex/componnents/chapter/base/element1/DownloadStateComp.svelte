<script lang="ts">
	import ChapterDownload from "@mangadex/download/chapter.svelte";
	import { CheckIcon, CloudDownload, DownloadIcon, XIcon } from "@lucide/svelte";
	import { Debounced, IsInViewport } from "runed";
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	let spanElement = $state<HTMLElement | undefined>();
	let isInViewport = new IsInViewport(() => spanElement);
	let isInViewportDebounced = new Debounced(() => isInViewport.current, 500);
	let downloadInstance = new ChapterDownload(
		() => id,
		() => isInViewportDebounced.current
	);
</script>

<span
	class:downloaded={downloadInstance.isChapterDownloaded}
	class:downloading={downloadInstance.isDownloading}
	class:failed={downloadInstance.hasChapterDownloadingFailed}
	bind:this={spanElement}
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
