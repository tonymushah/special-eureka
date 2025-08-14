<script lang="ts">
	import { getCurrentChapterData } from "@mangadex/componnents/chapter/page/contexts/currentChapter";
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import ChapterPages from "@mangadex/stores/chapter/pages";
	import { createSelect, melt, type SelectOption } from "@melt-ui/svelte";
	import { times } from "lodash";
	import { derived, get } from "svelte/store";
	import { slide } from "svelte/transition";

	type Page = {
		index: number;
	};
	const currentPageContext = getChapterCurrentPageContext();
	const currentPageSelectedReadable = derived(currentPageContext, ($page) => {
		return {
			value: $page,
			label: `${$page + 1}`
		} as SelectOption<number>;
	});
	const currentData = getCurrentChapterData();

	const options = derived(
		ChapterPages.initFromStore(derived(currentData, ($d) => $d.id)),
		($images) =>
			times($images.getImages().length).map<SelectOption<number>>((index) => ({
				value: index,
				label: `${index + 1}`
			}))
	);
	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<number>({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		},
		selected: {
			subscribe(run, invalidate) {
				return currentPageSelectedReadable.subscribe(run, invalidate);
			},
			set(value) {
				currentPageContext.set(value.value);
			},
			update(updater) {
				currentPageContext.set(updater(get(currentPageSelectedReadable)).value);
			}
		}
	});
</script>

<div class="layout">
	<div class="input" use:melt={$trigger}>
		<ButtonAccent>
			Page: {$selectedLabel}
		</ButtonAccent>
	</div>
</div>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $options as { value, label } (value)}
					<li use:melt={$option({ value, label })} class:isSelected={$isSelected(value)}>
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
