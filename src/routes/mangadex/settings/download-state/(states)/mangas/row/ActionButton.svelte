<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { MangaDownload } from "@mangadex/download/manga";
	import { derived as storeDerived } from "svelte/store";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	const download = MangaDownload.deferred(id);
	const is_downloading = download.is_downloading();
	const is_downloaded = storeDerived(
		[download.is_downloaded(), download.has_failed()],
		([downloaded, failed]) => {
			return downloaded || failed;
		}
	);
</script>

<div>
	{#if $is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			onclick={() => {
				download.remove();
			}}
		/>
		<PrimaryButtonOnlyLabel
			label="Re-Download"
			onclick={() => {
				download.download();
			}}
		/>
	{:else if $is_downloading}
		<ButtonAccentOnlyLabel
			label="Cancel"
			variant="5"
			onclick={() => {
				download.cancel();
			}}
		/>
	{:else}
		<PrimaryButtonOnlyLabel
			label="Download"
			onclick={() => {
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
		transform: translateY(-2px);
	}
</style>
