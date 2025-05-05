<script lang="ts">
	import { ChapterDownload } from "@mangadex/download/chapter";
	import { CheckIcon, DownloadCloudIcon, DownloadIcon, XIcon } from "svelte-feather-icons";
	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const chapter_download_inner = new ChapterDownload(id);
	const [downloading, downloaded, failed] = [
		chapter_download_inner.is_downloading(),
		chapter_download_inner.is_downloaded(),
		chapter_download_inner.has_failed()
	];
</script>

<span class:downloaded={$downloaded} class:downloading={$downloading} class:failed={$failed}>
	{#if $downloading}
		<DownloadCloudIcon />
	{:else if $failed}
		<XIcon />
	{:else if $downloaded}
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
