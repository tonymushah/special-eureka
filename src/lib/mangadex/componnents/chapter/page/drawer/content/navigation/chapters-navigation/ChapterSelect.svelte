<script lang="ts">
	import {
		createCombobox,
		createPopover,
		melt,
		type ComboboxOptionProps,
		type SelectOption
	} from "@melt-ui/svelte";
	import { getRelatedChapters, hasRelatedChapters } from "../../../../contexts/relatedChapters";
	import { derived } from "svelte/store";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { getCurrentChapterData } from "../../../../contexts/currentChapter";
	import { slide } from "svelte/transition";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { fireSelectChapterEvent } from "../../../../contexts/previousNextEventTarget";
	import { groupBy, map, reverse, upperCase } from "lodash";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	const hasRelated = hasRelatedChapters();
	const {
		elements: { menu, input: trigger, option, group, groupLabel },
		states: { open }
	} = createCombobox<string>({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		}
	});
	type OptionsMap = ComboboxOptionProps<string> & {
		volume: string;
	};
	const options = derived(getRelatedChapters(), ($related) =>
		groupBy(
			$related.map<OptionsMap>(({ chapter, volume, id }) => {
				let label: string;
				if (chapter != undefined) {
					if (chapter == "none" || chapter.length == 0) {
						label = "No label??";
					} else {
						label = `Chapter ${chapter}`;
					}
				} else {
					label = "No label??";
				}
				return {
					value: id,
					label,
					volume: volume ?? "none"
				};
			}),
			"volume"
		)
	);
	const current = getCurrentChapterData();
	const isSelected = derived([current], ([$current]) => {
		return (value: string) => $current.id == value;
	});
	const menu_options = derived(options, ($options) => reverse(Object.entries($options)));
</script>

<div class="layout">
	<div class="input" use:melt={$trigger}>
		<ButtonAccent>
			{#if $current.chapterNumber != undefined}
				Chapter {$current.chapterNumber}
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
				{#each $menu_options as [volume, chapters]}
					<section use:melt={$group(volume)}>
						<div class="label">
							<span use:melt={$groupLabel(volume)}>
								Volume {upperCase(volume)}
							</span>
							<hr />
						</div>
						{#each chapters as chapter}
							<li
								use:melt={$option(chapter)}
								on:m-click={() => {
									fireSelectChapterEvent(chapter.value);
								}}
								class:isSelected={$isSelected(chapter.value)}
							>
								<h4>{chapter.label}</h4>
							</li>
						{/each}
					</section>
				{/each}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.label {
		padding: 0em 0.5em;
		color: var(--mid-tone);
		display: flex;
		gap: 2px;
		align-items: center;
		font-size: 12px;
		font-family: inherit;
		font-weight: 800;
		hr {
			flex-grow: 1;
			height: 1px;
			background-color: var(--mid-tone);
			border: none;
		}
	}
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

		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		section {
			list-style: none;
			li {
				transition: background-color 200ms ease-in-out;
				h4 {
					padding-left: 0.5em;
					margin: 0px;
					font-size: 14px;
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
	}
	.input {
		display: grid;
	}
</style>
