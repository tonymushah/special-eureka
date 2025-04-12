<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { CoverDownload } from "@mangadex/download/cover";
	import { derived as storeDerived } from "svelte/store";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	const download = CoverDownload.deferred(id);
	const is_downloading = download.is_downloading();
	const is_downloaded = storeDerived(
		[download.is_downloaded(), download.has_failed()],
		([downloaded, failed]) => downloaded && failed
	);
</script>

<div>
	{#if $is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			on:click={() => {
				download.remove();
			}}
		/>
		<PrimaryButtonOnlyLabel
			label="Re-Download"
			on:click={() => {
				download.download();
			}}
		/>
	{:else if $is_downloading}
		<ButtonAccentOnlyLabel
			label="Cancel"
			variant="5"
			on:click={() => {
				download.cancel();
			}}
		/>
	{:else}
		<PrimaryButtonOnlyLabel
			label="Download"
			on:click={() => {
				download.download();
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
	}
</style>
