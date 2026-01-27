<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import Selections from "./chapter/Selections.svelte";
	import { multiChapterDownload as multiChapterDownloadLoader } from "./chapter/download";
	import { removeMultipleChapterMutation as removeMultipleChapterMutationLoader } from "./chapter/local-remove";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { dev } from "$app/environment";
	import { isLogged } from "@mangadex/utils/auth";
	import { readMarkers } from "@mangadex/stores/read-markers/mutations";

	interface Props {
		chapters: string[];
	}
	let multiChapterDownload = multiChapterDownloadLoader();
	let removeMultipleChapterMutation = removeMultipleChapterMutationLoader();
	let exportIdsToTxt = exportIdsToTxtLoader();
	let { chapters = $bindable([]) }: Props = $props();
	let currentAction: "selection" = $state("selection");
	let canDelete = false;
	let readMarker = readMarkers();
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections bind:chapters />
		{/if}
	{/snippet}
	{#snippet actions()}
		<ButtonAccentOnlyLabel
			label="Change Selections"
			variant={currentAction == "selection" ? "5" : "3"}
			onclick={() => {
				currentAction = "selection";
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			label="Download"
			disabled={multiChapterDownload.isPending ||
				removeMultipleChapterMutation.isPending ||
				!$isMounted}
			onclick={() => {
				multiChapterDownload.mutate(chapters);
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={multiChapterDownload.isPending ||
				removeMultipleChapterMutation.isPending ||
				!$isMounted}
			label="Remove them locally"
			onclick={() => {
				removeMultipleChapterMutation.mutate(chapters);
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={exportIdsToTxt.isPending}
			label="Export ids as txt"
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: chapters
					},
					{
						onError(error) {
							addErrorToast("Cannot export chapters ids as txt", error);
						},
						onSuccess(data) {
							revealItemInDir(data);
						}
					}
				);
			}}
		/>
		{#if $isLogged || dev}
			<ButtonAccentOnlyLabel
				variant="3"
				disabled={readMarker.isPending}
				label="Mark as read"
				onclick={() => {
					readMarker.mutateAsync(
						{
							reads: chapters,
							unreads: []
						},
						{
							onError(error) {
								addErrorToast("Cannot mark chapters as read", error);
							},
							onSuccess(data, variables) {
								addToast({
									title: `Marked ${variables.reads.length} chapter${variables.reads.length == 1 ? "" : "s"} as read`
								});
							}
						}
					);
				}}
			/>
			<ButtonAccentOnlyLabel
				variant="3"
				disabled={readMarker.isPending}
				label="Mark as unread"
				onclick={() => {
					readMarker.mutateAsync(
						{
							reads: [],
							unreads: chapters
						},
						{
							onError(error) {
								addErrorToast("Cannot mark chapters as unread", error);
							},
							onSuccess(data, variables) {
								addToast({
									title: `Marked ${variables.reads.length} chapter${variables.reads.length == 1 ? "" : "s"} as read`,
									type: "success"
								});
							}
						}
					);
				}}
			/>
		{/if}
		{#if canDelete}
			<DangerButtonOnlyLabel variant="1" label="Delete them permanently" />
		{/if}
	{/snippet}
</SectionBase>
