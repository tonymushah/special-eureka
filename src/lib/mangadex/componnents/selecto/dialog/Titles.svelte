<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import AddToListBatch from "./titles/AddToListBatch.svelte";
	import UpdateReadingStatuses from "./titles/UpdateReadingStatuses.svelte";
	import { dev } from "$app/environment";
	import { titlesDownload } from "./titles/download";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import Selections from "./titles/Selections.svelte";

	interface Props {
		titles: string[];
	}
	let { titles = $bindable() }: Props = $props();
	let currentAction: "lists" | "status" | "selections" = $state("lists");
	function showLists() {
		currentAction = "lists";
	}
	function showStatus() {
		currentAction = "status";
	}
	function showSelecetions() {
		currentAction = "selections";
	}
	let isLists = $derived(currentAction == "lists");
	// @ts-ignore
	let isStatus = $derived(currentAction == "status");
	//@ts-ignore
	let isSelecting = $derived(currentAction == "selections");
</script>

<div class="titles">
	<div class="content">
		{#if isLists}
			<AddToListBatch {titles} />
		{:else if isStatus}
			<UpdateReadingStatuses {titles} />
		{:else if isSelecting}
			<Selections bind:titles />
		{/if}
	</div>
	<div class="actions">
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
		<ButtonAccentOnlyLabel variant="3" label="Export ids to txt" />
		{#if dev}
			<ButtonAccentOnlyLabel variant="3" label="Export as emdx" />
		{/if}
	</div>
</div>

<style lang="scss">
	.titles {
		display: flex;
		gap: 12px;
		width: 100%;
		height: 77%;
	}
	.content {
		flex: 1;
		height: 100%;
	}
	.actions {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
</style>
