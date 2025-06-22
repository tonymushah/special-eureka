<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import Selections from "./chapter/Selections.svelte";
	import { multiChapterDownload } from "./chapter/download";
	import { removeMultipleChapterMutation } from "./chapter/local-remove";

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
			disabled={$multiChapterDownload.isPending && $removeMultipleChapterMutation.isPending}
			onclick={() => {
				$multiChapterDownload.mutate(chapters);
			}}
		/>
		<ButtonAccentOnlyLabel
			variant="3"
			disabled={$multiChapterDownload.isPending && $removeMultipleChapterMutation.isPending}
			label="Remove them locally"
			onclick={() => {
				$removeMultipleChapterMutation.mutate(chapters);
			}}
		/>
		{#if canDelete}
			<DangerButtonOnlyLabel variant="1" label="Delete them permanently" />
		{/if}
	{/snippet}
</SectionBase>
