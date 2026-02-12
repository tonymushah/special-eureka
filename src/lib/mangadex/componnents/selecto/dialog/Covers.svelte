<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import Selections from "./covers/Selections.svelte";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";

	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
	let currentAction = $state<"selection">("selection");
	let exportIdsToTxt = exportIdsToTxtLoader();
	let coversEmpty = $derived(covers.length == 0);
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections bind:covers />
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
			variant="3"
			disabled={exportIdsToTxt.isPending || coversEmpty}
			label="Export ids as txt"
			onclick={() => {
				exportIdsToTxt.mutateAsync(
					{
						uuids: covers
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
		<ButtonAccentOnlyLabel variant="3" disabled label="Save covers in a directory" />
		<ButtonAccentOnlyLabel variant="3" disabled label="Save covers as zip" />
	{/snippet}
</SectionBase>
