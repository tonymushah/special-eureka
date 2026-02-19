<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import Selections from "./covers/Selections.svelte";
	import exportIdsToTxtLoader from "@mangadex/gql-docs/export/ids";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { revealItemInDir } from "@tauri-apps/plugin-opener";
	import Save from "./covers/Save.svelte";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import { dev } from "$app/environment";
	import { downloadCoversLocally } from "@mangadex/utils/covers/download";

	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
	let currentAction = $state<"selection" | "save">("selection");
	let exportIdsToTxt = exportIdsToTxtLoader();
	let coversEmpty = $derived(covers.length == 0);
	let downloadCovers = downloadCoversLocally();
</script>

<SectionBase>
	{#snippet content()}
		{#if currentAction == "selection"}
			<Selections bind:covers />
		{:else if currentAction == "save"}
			<Save {covers} />
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
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={currentAction == "save"}
			label="Save covers somewhere..."
			onclick={() => {
				currentAction = "save";
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={!$isMounted || downloadCovers.isPending}
			label="Download in offline database"
			onclick={() => {
				downloadCovers.mutate(covers, {
					onError(error) {
						addErrorToast("Cannot download cover ids in offline database", error);
					},
					onSuccess() {
						addToast({
							title: "Downloaded in offline database",
							type: "success"
						});
					}
				});
			}}
		/>
	{/snippet}
</SectionBase>
