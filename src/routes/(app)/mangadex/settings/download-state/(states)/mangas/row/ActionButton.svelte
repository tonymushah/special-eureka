<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import {
		cancelMutation,
		downloadMutationQuery,
		hasMangaDownloadingFailed,
		isMangaDownloaded,
		isMangaDownloading,
		removeMutation
	} from "@mangadex/download/manga";
	import { derived as storeDerived } from "svelte/store";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	const is_downloading = isMangaDownloading({ id, deferred: true });
	const is_downloaded = storeDerived(
		[
			isMangaDownloaded({ id, deferred: true }),
			hasMangaDownloadingFailed({ id, deferred: true })
		],
		([downloaded, failed]) => {
			return downloaded || failed;
		}
	);
</script>

<div>
	{#if $is_downloaded}
		<DangerButtonOnlyLabel
			label="Delete"
			onclick={async () => {
				await $removeMutation.mutateAsync(id);
			}}
		/>
		<PrimaryButtonOnlyLabel
			label="Re-Download"
			onclick={() => {
				$downloadMutationQuery.mutateAsync(id);
			}}
		/>
	{:else if $is_downloading}
		<ButtonAccentOnlyLabel
			label="Cancel"
			variant="5"
			onclick={() => {
				$cancelMutation.mutateAsync(id);
			}}
		/>
	{:else}
		<PrimaryButtonOnlyLabel
			label="Download"
			onclick={() => {
				$downloadMutationQuery.mutateAsync(id);
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
