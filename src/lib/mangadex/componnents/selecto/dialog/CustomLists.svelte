<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import Selections from "./custom-lists/Selections.svelte";

	interface Props {
		customLists?: string[];
	}
	let { customLists = [] }: Props = $props();

	let customListsEmpty = $derived(customLists.length == 0);
	let currentAction = $state<"selection" | "download-titles">("selection");
	let exportIdsToTxt = exportIdsToTxtLoader();
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections {customLists} />
		{/if}
	{/snippet}
	{#snippet actions()}
		<ButtonAccentOnlyLabel
			label="Change Selections"
			variant={currentAction == "selection" ? "5" : "3"}
			onclick={() => {
				currentAction = "selection";
			}}
			disabled={currentAction == "selection"}
		/>
		<ButtonAccentOnlyLabel
			label="Export ids to txt"
			variant="3"
			disabled={exportIdsToTxt.isPending || customListsEmpty}
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: customLists
					},
					{
						onError(error) {
							addErrorToast("Cannot export cover ids as txt", error);
						},
						onSuccess(data) {
							revealItemInDir(data);
						}
					}
				);
			}}
		/>
	{/snippet}
</SectionBase>
