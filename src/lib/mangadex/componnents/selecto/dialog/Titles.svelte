<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import AddToListBatch from "./titles/AddToListBatch.svelte";
	import UpdateReadingStatuses from "./titles/UpdateReadingStatuses.svelte";
	import { dev } from "$app/environment";
	import { titlesDownload as titlesDownloadLoader } from "./titles/download";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import Selections from "./titles/Selections.svelte";
	import SectionBase from "./SectionBase.svelte";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import ExportTitlesAsCsv from "./titles/export/ExportTitlesAsCSV.svelte";
	import ExportTitlesAsMal from "./titles/export/ExportTitlesAsMAL.svelte";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { getSelectoDialogContextData } from "../utils";
	import { isLogged } from "@mangadex/utils/auth";
	import { removeTitlesFromCustomListMutation } from "@mangadex/mutations/custom-list/remove-titles";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	interface Props {
		titles: string[];
	}
	let { titles: titles_main }: Props = $props();
	let titlesDownload = titlesDownloadLoader();
	let exportIdsToTxt = exportIdsToTxtLoader();
	let titles = $derived(titles_main);
	let currentAction = $state<"lists" | "status" | "selections" | "export-csv" | "export-mal">(
		"selections"
	);
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
	let isStatus = $derived(currentAction == "status");
	let isSelecting = $derived(currentAction == "selections");
	let isExportCSV = $derived(currentAction == "export-csv");
	let isExportMAL = $derived(currentAction == "export-mal");
	let titlesEmpty = $derived(titles_main.length == 0);
	const contextData = getSelectoDialogContextData();
	let toRemoveCustomList = $derived.by(() => contextData()?.currentCustomList);
	let removeFromCustomList = removeTitlesFromCustomListMutation();
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
			disabled={isSelecting}
		/>
		{#if toRemoveCustomList}
			<ButtonAccentOnlyLabel
				variant={isLists ? "5" : "3"}
				label="Remove from current custom list"
				onclick={() => {
					removeFromCustomList.mutate(
						{
							titlesIds: titles,
							customListId: toRemoveCustomList
						},
						{
							onSuccess() {
								addToast({
									title: `Removed ${titles.length} from current custom list`,
									type: "success",
									description: "You will be redirected to the custom list shortly"
								});
								goto(
									route("/mangadex/list/[id]", {
										id: toRemoveCustomList
									})
								);
							},
							onError(error) {
								addErrorToast(
									`Cannot remove ${titles.length} titles from current custom list`,
									error
								);
							}
						}
					);
				}}
				disabled={!$isLogged}
			/>
		{/if}
		<ButtonAccentOnlyLabel
			variant={isLists ? "5" : "3"}
			label="Add to list"
			onclick={() => {
				showLists();
			}}
			disabled={isLists}
		/>
		<ButtonAccentOnlyLabel
			variant={isStatus ? "5" : "3"}
			label="Update reading status"
			onclick={() => {
				showStatus();
			}}
			disabled={isStatus}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={titlesDownload.isPending || !$isMounted}
			label="Download"
			onclick={() => {
				titlesDownload
					.mutateAsync(titles)
					.then(() => {
						addToast({
							title: "Titles downloaded",
							type: "success"
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
			disabled={isExportCSV}
		/>
		<ButtonAccentOnlyLabel
			label="Export titles as MAL"
			variant={isExportMAL ? "5" : "3"}
			onclick={() => {
				showExportMAL();
			}}
			disabled={isExportMAL}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			label="Export ids to txt"
			disabled={exportIdsToTxt.isPending || titlesEmpty}
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: titles
					},
					{
						onSuccess(data) {
							revealItemInDir(data);
						},
						onError(error) {
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
