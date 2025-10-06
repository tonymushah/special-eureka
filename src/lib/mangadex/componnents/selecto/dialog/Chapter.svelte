<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import Selections from "./chapter/Selections.svelte";
	import { multiChapterDownload } from "./chapter/download";
	import { removeMultipleChapterMutation } from "./chapter/local-remove";
	import exportIdsToTxt from "@mangadex/gql-docs/export/ids";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";

	interface Props {
		chapters: string[];
	}
	let { chapters = $bindable([]) }: Props = $props();
	let currentAction: "selection" = $state("selection");
	let canDelete = false;
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
			disabled={multiChapterDownload.isPending &&
				removeMultipleChapterMutation.isPending &&
				!$isMounted}
			onclick={() => {
				multiChapterDownload.mutate(chapters);
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={multiChapterDownload.isPending && removeMultipleChapterMutation.isPending}
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
						onError(error, variables, context) {
							addErrorToast("Cannot export chapters ids as txt", error);
						},
						onSuccess(data, variables, context) {
							revealItemInDir(data);
						}
					}
				);
			}}
		/>
		{#if canDelete}
			<DangerButtonOnlyLabel variant="1" label="Delete them permanently" />
		{/if}
	{/snippet}
</SectionBase>
