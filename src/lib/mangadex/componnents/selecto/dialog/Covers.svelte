<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import SectionBase from "./SectionBase.svelte";
	import Selections from "./covers/Selections.svelte";

	interface Props {
		covers?: string[];
	}
	let { covers = $bindable([]) }: Props = $props();
	let currentAction = $state<"selection">("selection");
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
	{/snippet}
</SectionBase>
