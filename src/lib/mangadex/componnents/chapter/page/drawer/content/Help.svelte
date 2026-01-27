<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./help/Icon.svelte";
	import { fireChapterHelpEvent } from "../../contexts/previousNextEventTarget";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
</script>

<section>
	<Tooltip rootDisplay="grid">
		{#snippet triggerContent()}
			<ButtonAccentOnlyLabel icon={Icon} onclick={fireChapterHelpEvent} label="Help" />
		{/snippet}
		{#snippet tooltipContent()}
			<p class="description">It's the manual or <br /> whatever I will show there</p>
		{/snippet}
	</Tooltip>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
		position: relative;
	}
	.description {
		margin: 0;
		color: var(--text-color);
	}
</style>
