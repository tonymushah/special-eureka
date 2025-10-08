<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import {
		cancelDonwloadMutation as cancelDonwloadMutationLoader,
		downloadMutationQuery as downloadMutationQueryLoader,
		hasCoverDownloadingFailed,
		isCoverDownloaded,
		isCoverDownloading,
		removeMutation as removeMutationLoader
	} from "@mangadex/download/cover";
	import { derived as storeDerived } from "svelte/store";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	const is_downloading = isCoverDownloading({ id, deferred: true });
	const is_downloaded = storeDerived(
		[
			isCoverDownloaded({
				id,
				deferred: true
			}),
			hasCoverDownloadingFailed({
				id,
				deferred: true
			})
		],
		([downloaded, failed]) => downloaded || failed
	);
	let cancelMutation = cancelDonwloadMutationLoader();
	let downloadMutationQuery = downloadMutationQueryLoader();
	let removeMutation = removeMutationLoader();
</script>

<div>
	{#if $is_downloaded}
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
	{:else if $is_downloading}
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
