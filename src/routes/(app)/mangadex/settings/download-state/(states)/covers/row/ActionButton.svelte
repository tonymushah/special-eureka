<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import {
		cancelDonwloadMutation,
		downloadMutationQuery,
		hasCoverDownloadingFailed,
		isCoverDownloaded,
		isCoverDownloading,
		removeMutation
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
				cancelDonwloadMutation.mutateAsync(id);
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
