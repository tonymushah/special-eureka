<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import MangaDownload, {
		cancelMutation as cancelMutationLoader,
		downloadMutationQuery as downloadMutationQueryLoader,
		removeMutation as removeMutationLoader
	} from "@mangadex/download/manga.svelte";
	import { Debounced, IsInViewport } from "runed";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();

	let layout = $state<HTMLElement | undefined>();
	let isInViewPort = new IsInViewport(() => layout);
	let isInViewportDebounced = new Debounced(() => isInViewPort.current, 500);
	let mangaDownload = new MangaDownload(
		() => id,
		() => isInViewportDebounced.current
	);
	let is_downloading = $derived(mangaDownload.isMangaDownloading);
	let is_downloaded = $derived(
		mangaDownload.isMangaDownloaded || mangaDownload.hasMangaDownloadingFailed
	);
	let cancelMutation = cancelMutationLoader();
	let downloadMutationQuery = downloadMutationQueryLoader();
	let removeMutation = removeMutationLoader();
</script>

<div bind:this={layout}>
	{#if is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			onclick={async () => {
				await removeMutation.mutateAsync(id);
			}}
		/>
		<PrimaryButtonOnlyLabel
			label="Re-Download"
			onclick={() => {
				downloadMutationQuery.mutateAsync(id);
			}}
		/>
	{:else if is_downloading}
		<ButtonAccentOnlyLabel
			label="Cancel"
			variant="5"
			onclick={() => {
				cancelMutation.mutateAsync(id);
			}}
		/>
	{:else}
		<PrimaryButtonOnlyLabel
			label="Download"
			onclick={() => {
				downloadMutationQuery.mutateAsync(id);
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
