<script lang="ts">
	import { derived } from "svelte/store";
	import { getCurrentChapterData } from "../../contexts/currentChapter";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./change-group/Icon.svelte";
	import { fireChapterChangeGroupThreadEvent } from "../../contexts/previousNextEventTarget";

	const canChange = derived(getCurrentChapterData(), ($current) => $current.canChangeGroups);
</script>

{#if $canChange}
	<section>
		<ButtonAccentOnlyLabel
			variant="3"
			on:click={fireChapterChangeGroupThreadEvent}
			label="Change group"
			icon={Icon}
		/>
	</section>
{/if}

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
