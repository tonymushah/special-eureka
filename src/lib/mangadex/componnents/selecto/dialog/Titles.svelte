<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import AddToListBatch from "./titles/AddToListBatch.svelte";
	import UpdateReadingStatuses from "./titles/UpdateReadingStatuses.svelte";
	import { dev } from "$app/environment";
	import { titlesDownload } from "./titles/download";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import Selections from "./titles/Selections.svelte";
	import SectionBase from "./SectionBase.svelte";
	import exportIdsToTxt from "@mangadex/gql-docs/export/ids";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import ExportTitlesAsCsv from "./titles/export/ExportTitlesAsCSV.svelte";
	import ExportTitlesAsMal from "./titles/export/ExportTitlesAsMAL.svelte";

	interface Props {
		titles: string[];
	}
	let { titles = $bindable() }: Props = $props();
	let currentAction: "lists" | "status" | "selections" | "export-csv" | "export-mal" =
		$state("lists");
	function showLists() {
		currentAction = "lists";
	}
	function showStatus() {
		currentAction = "status";
	}
	function showSelecetions() {
		currentAction = "selections";
	}
	function showExportCSV() {
		currentAction = "export-csv";
	}
	function showExportMAL() {
		currentAction = "export-mal";
	}
	let isLists = $derived(currentAction == "lists");
	// @ts-ignore
	let isStatus = $derived(currentAction == "status");
	//@ts-ignore
	let isSelecting = $derived(currentAction == "selections");
	//@ts-ignore
	let isExportCSV = $derived(currentAction == "export-csv");
	//@ts-ignore
	let isExportMAL = $derived(currentAction == "export-mal");
</script>

<SectionBase>
	{#snippet content()}
		{#if isLists}
			<AddToListBatch {titles} />
		{:else if isStatus}
			<UpdateReadingStatuses {titles} />
		{:else if isSelecting}
			<Selections bind:titles />
		{:else if isExportCSV}
			<ExportTitlesAsCsv {titles} />
		{:else if isExportMAL}
			<ExportTitlesAsMal {titles} />
		{/if}
	{/snippet}
	{#snippet actions()}
		<ButtonAccentOnlyLabel
			label="Change Selections"
			variant={isSelecting ? "5" : "3"}
			onclick={() => {
				showSelecetions();
			}}
		/>
		<ButtonAccentOnlyLabel
			variant={isLists ? "5" : "3"}
			label="Add to list"
			onclick={() => {
				showLists();
			}}
		/>
		<ButtonAccentOnlyLabel
			variant={isStatus ? "5" : "3"}
			label="Update reading status"
			onclick={() => {
				showStatus();
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={$titlesDownload.isPending}
			label="Download"
			onclick={() => {
				$titlesDownload
					.mutateAsync(titles)
					.then(() => {
						addToast({
							data: {
								variant: "primary",
								title: "Titles downloaded"
							}
						});
					})
					.catch((e) => {
						addErrorToast("Failed to download some titles", e);
					});
			}}
		/>
		<ButtonAccentOnlyLabel
			label="Export titles as CSV"
			variant={isExportCSV ? "5" : "3"}
			onclick={() => {
				showExportCSV();
			}}
		/>
		<ButtonAccentOnlyLabel
			label="Export titles as MAL"
			variant={isExportMAL ? "5" : "3"}
			onclick={() => {
				showExportMAL();
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			label="Export ids to txt"
			disabled={$exportIdsToTxt.isPending}
			onclick={() => {
				$exportIdsToTxt.mutateAsync(
					{
						uuids: titles
					},
					{
						onSuccess(data, variables, context) {
							revealItemInDir(data);
						},
						onError(error, variables, context) {
							addErrorToast("Cannot export ids as txt", error);
						}
					}
				);
			}}
		/>
		{#if dev}
			<ButtonAccentOnlyLabel variant="3" label="Export as emdx" />
		{/if}
	{/snippet}
</SectionBase>
