<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import ChapterDownload, {
		downloadMutation as downloadMutationLoader,
		cancelDownloadMutation as cancelDownloadMutationLoader
	} from "@mangadex/download/chapter.svelte";
	import { IsInViewport } from "runed";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	let layout = $state<HTMLElement | undefined>();
	let isInViewport = new IsInViewport(() => layout);
	let downloadInstance = new ChapterDownload(
		() => id,
		() => isInViewport.current
	);
	let is_downloading = $derived(downloadInstance.isDownloading);
	let is_downloaded = $derived(
		downloadInstance.isChapterDownloaded || downloadInstance.hasChapterDownloadingFailed
	);
	let downloadMutation = downloadMutationLoader();
	let cancelDownloadMutation = cancelDownloadMutationLoader();
</script>

<div bind:this={layout}>
	{#if is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			onclick={() => {
				downloadInstance.remove();
			}}
		/>
		<PrimaryButtonOnlyLabel
			label="Re-Download"
			onclick={() => {
				downloadMutation.mutateAsync({
					id
				});
			}}
		/>
	{:else if is_downloading}
		<ButtonAccentOnlyLabel
			label="Cancel"
			variant="5"
			onclick={() => {
				cancelDownloadMutation.mutateAsync(id);
			}}
		/>
	{:else}
		<PrimaryButtonOnlyLabel
			label="Download"
			onclick={() => {
				downloadMutation.mutateAsync({
					id
				});
			}}
		/>
	{/if}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: row;
		gap: 3px;
		flex-wrap: wrap;
		transform: translateY(-2px);
	}
</style>
