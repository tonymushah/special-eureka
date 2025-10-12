<script lang="ts">
	import {
		hasChapterDownloadingFailed,
		isChapterDownloaded,
		isChapterDownloading
	} from "@mangadex/download/chapter";
	import { CheckIcon, DownloadCloudIcon, DownloadIcon, XIcon } from "svelte-feather-icons";
	interface Props {
		id: string;
	}

	let { id }: Props = $props();

	const downloading = isChapterDownloading({
		id
	});
	const failed = hasChapterDownloadingFailed({
		id
	});
	const downloaded_ = isChapterDownloaded({
		id
	});
	let downloaded = $derived($downloaded_);
</script>

<span class:downloaded class:downloading={$downloading} class:failed={$failed}>
	{#if $downloading}
		<DownloadCloudIcon />
	{:else if $failed}
		<XIcon />
	{:else if downloaded}
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
