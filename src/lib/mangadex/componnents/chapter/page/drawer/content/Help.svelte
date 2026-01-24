<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { fade } from "svelte/transition";
	import Icon from "./help/Icon.svelte";
	import { fireChapterHelpEvent } from "../../contexts/previousNextEventTarget";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
</script>

<section>
	<Tooltip>
		{#snippet triggerContent()}
			<ButtonAccentOnlyLabel icon={Icon} onclick={fireChapterHelpEvent} label="Help" />
		{/snippet}
		{#snippet tooltipContent()}
			<p class="description">It's the manual or whatever I will show there</p>
		{/snippet}
	</Tooltip>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	.description {
		padding-left: 1rem; /* 16px */
		padding-right: 1rem; /* 16px */
		padding-top: 0.25rem; /* 4px */
		padding-bottom: 0.25rem; /* 4px */
		margin: 0;
		color: var(--text-color);
	}
</style>
