<script lang="ts">
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { createTooltip, melt } from "@melt-ui/svelte";
	import { fade } from "svelte/transition";
	import Icon from "./help/Icon.svelte";
	import { fireChapterHelpEvent } from "../../contexts/previousNextEventTarget";

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: "top"
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true
	});
</script>

<section>
	<trigger use:melt={$trigger}>
		<ButtonAccentOnlyLabel icon={Icon} on:click={fireChapterHelpEvent} label="Help" />
	</trigger>
</section>

{#if $open}
	<div class="tooltip" use:melt={$content} transition:fade={{ duration: 100 }}>
		<MangaDexVarThemeProvider>
			<div class="content">
				<arrow use:melt={$arrow} />
				<p class="px-4 py-1 text-magnum-700">
					It's the manual or whatever I will show there
				</p>
			</div>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
	trigger {
		display: grid;
	}
	div.tooltip {
		z-index: 10;
		div.content {
			border-radius: 0.5rem;
			box-shadow:
				0 1px 3px 0 rgb(0 0 0 / 0.1),
				0 1px 2px -1px rgb(0 0 0 / 0.1);
			background-color: var(--accent-l1);
			p {
				padding-left: 1rem; /* 16px */
				padding-right: 1rem; /* 16px */
				padding-top: 0.25rem; /* 4px */
				padding-bottom: 0.25rem; /* 4px */
				margin: 0;
				color: var(--text-color);
			}
		}
	}
</style>
