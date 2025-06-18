<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import DangerButtonOnlyLabel from "@mangadex/componnents/theme/buttons/DangerButtonOnlyLabel.svelte";
	import Selections from "./chapter/Selections.svelte";

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
		<ButtonAccentOnlyLabel variant="3" label="Download" />
		<ButtonAccentOnlyLabel variant="3" label="Remove them locally" />
		{#if canDelete}
			<DangerButtonOnlyLabel variant="1" label="Delete them permanently" />
		{/if}
	{/snippet}
</SectionBase>
