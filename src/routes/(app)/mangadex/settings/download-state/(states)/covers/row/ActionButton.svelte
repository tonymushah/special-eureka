<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import CoverDownload, {
		cancelDonwloadMutation as cancelDonwloadMutationLoader,
		downloadMutationQuery as downloadMutationQueryLoader,
		removeMutation as removeMutationLoader
	} from "@mangadex/download/cover.svelte";
	import { Debounced, IsInViewport } from "runed";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	let layout = $state<HTMLElement | undefined>();
	let isInViewport = new IsInViewport(() => layout);
	let isInViewportDebounced = new Debounced(() => isInViewport.current, 500);
	let downloadInstance = new CoverDownload(
		() => id,
		() => isInViewport.current
	);
	let is_downloading = $derived(downloadInstance.isCoverDownloading);
	const is_downloaded = $derived(
		downloadInstance.isCoverDownloaded || downloadInstance.hasCoverDownloadingFailed
	);
	let cancelMutation = cancelDonwloadMutationLoader();
	let downloadMutationQuery = downloadMutationQueryLoader();
	let removeMutation = removeMutationLoader();
</script>

<div bind:this={layout}>
	{#if is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			onclick={() => {
				removeMutation.mutateAsync(id);
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
