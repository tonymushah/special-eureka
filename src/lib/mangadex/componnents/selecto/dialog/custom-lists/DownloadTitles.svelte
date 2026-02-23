<script lang="ts">
	import { Download } from "@lucide/svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { MangaDownloadExtras } from "@mangadex/gql/graphql";
	import { downloadTitlesCustomListsMutation } from "@mangadex/mutations/custom-list/download-titles";
	import { isLinuxStore } from "@special-eureka/core/commands/isLinux";

	interface Props {
		customLists: string[];
	}
	let { customLists }: Props = $props();

	let customListsEmpty = $derived(customLists.length == 0);
	let downloadTitles = downloadTitlesCustomListsMutation();
	let filterContent = $state(false);
	let extras = $state<MangaDownloadExtras | null>(null);
</script>

<div class="layout">
	<div class="content">
		<h3>Download custom list titles</h3>
		<div class="option">
			<input
				id="download-titles-list-filter-content-checkbox"
				type="checkbox"
				bind:checked={filterContent}
			/>
			<label for="download-titles-list-filter-content-checkbox">Filter content</label>
		</div>
		<div class="option">
			<label for="download-titles-list-extras-select">Extras:</label>
			<select
				id="download-titles-list-extras-select"
				class:isNotLinux={!$isLinuxStore}
				bind:value={extras}
			>
				<option value={null}>None</option>
				<option value={MangaDownloadExtras.AllChapters}>Download all chapters</option>
				<option value={MangaDownloadExtras.Failed}>Download only the failed download ones</option>
				<option value={MangaDownloadExtras.UnDownloadeds}
					>Download only the non-downloaded chapters</option
				>
				<option value={MangaDownloadExtras.UnReadFailed}
					>Download only the un-read and failed downloaded ones</option
				>
				<option value={MangaDownloadExtras.UnReadUnDownloadeds}
					>Download only the un-read and non-downloaded chapters</option
				>
				<option value={MangaDownloadExtras.Unreads}>Download only the un-read chapter</option>
			</select>
		</div>
	</div>
	<div class="actions">
		<PrimaryButtonOnlyLabel
			label="Download"
			icon={Download}
			onclick={() => {
				downloadTitles.mutate({
					listIDs: customLists,
					filter: filterContent,
					extras
				});
			}}
		/>
	</div>
</div>

<style lang="scss">
	.layout {
		display: grid;
	}
	.option {
		display: flex;
		align-items: center;
		gap: 4px;
		flex-direction: row;
	}
	select {
		background-color: var(--accent-l1);
		border-radius: 6px;
		padding: 8px 12px;
		border: 3px solid var(--mid-tone);
		min-height: 3em;
		min-width: 3em;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		font-family: inherit;
	}
	select.isNotLinux {
		color: var(--text-color);
	}
</style>
