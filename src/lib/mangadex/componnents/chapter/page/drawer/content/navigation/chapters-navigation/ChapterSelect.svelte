<script lang="ts">
	import { createPopover, melt, type SelectOption } from "@melt-ui/svelte";
	import { getRelatedChapters, hasRelatedChapters } from "../../../../contexts/relatedChapters";
	import { derived } from "svelte/store";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { getCurrentChapterData } from "../../../../contexts/currentChapter";
	import { slide } from "svelte/transition";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { fireSelectChapterEvent } from "../../../../contexts/previousNextEventTarget";
	const hasRelated = hasRelatedChapters();
	const {
		elements: { content: menu, trigger, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		}
	});
	const options = derived(getRelatedChapters(), ($related) =>
		$related.map<SelectOption<string>>(({ chapter, volume, id }) => {
			let label: string;
			if (chapter != undefined && volume != undefined) {
				if (volume == "none" || volume.length == 0) {
					if (chapter == "none" || chapter.length == 0) {
						label = "No label??";
					} else {
						label = `Ch. ${chapter}`;
					}
				} else {
					label = `Vol. ${volume} Ch. ${chapter}`;
				}
			} else if (chapter != undefined) {
				if (chapter == "none" || chapter.length == 0) {
					label = "No label??";
				} else {
					label = `Ch. ${chapter}`;
				}
			} else {
				label = "No label??";
			}
			return {
				value: id,
				label
			};
		})
	);
	const current = getCurrentChapterData();
	const isSelected = derived([current], ([$current]) => {
		return (value: string) => $current.id == value;
	});
</script>

<div class="layout">
	<div class="input" use:melt={$trigger}>
		<ButtonAccent>
			{#if $current.chapterNumber != undefined && $current.volume != undefined}
				Vol. {$current.volume} Ch. {$current.chapterNumber}
			{:else if $current.chapterNumber != undefined}
				Ch. {$current.chapterNumber}
			{:else if $current.isOneshot}
				Oneshot
			{:else}
				??
			{/if}
		</ButtonAccent>
	</div>
</div>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $options as { value, label }}
					<li
						use:melt={$close}
						onm-click={() => {
							fireSelectChapterEvent(value);
						}}
						class:isSelected={$isSelected(value)}
					>
						<h4>{label}</h4>
					</li>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
	}
	.layout {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			h4 {
				margin: 0px;
			}
		}
		li:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		li:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		li.isSelected {
			background-color: var(--primary);
		}
	}
	.input {
		display: grid;
	}
</style>
