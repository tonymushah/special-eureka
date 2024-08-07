<!--
    BUG I don't know why the primary doesn't work
-->
<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import getChapterDoublePageIndexes from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageIndexes";

	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { createSelect, melt, type SelectOption } from "@melt-ui/svelte";
	import { isArray } from "lodash";
	import { derived, get } from "svelte/store";
	import { slide } from "svelte/transition";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";

	const readingDirection = getCurrentChapterDirection();
	type Page = [number, number] | number;
	const currentPageContext = getChapterCurrentPageContext();
	const currentPageSelectedReadable = derived(
		[getChapterDoublePageCurrentPageIndex(), getChapterDoublePageIndexes(), readingDirection],
		([$index, $pages, $dir]) => {
			const value = $pages[$index];
			const label = isArray(value)
				? `${value[$dir == ReadingDirection.Ltr ? 0 : 1] + 1} - ${value[$dir == ReadingDirection.Ltr ? 1 : 0] + 1}`
				: `${value + 1}`;
			return {
				value,
				label
			} as SelectOption<Page>;
		}
	);
	const options = derived([getChapterDoublePageIndexes(), readingDirection], ([$images, $dir]) =>
		$images.map<SelectOption<[number, number] | number>>((value) => ({
			value,
			label: isArray(value)
				? `${value[$dir == ReadingDirection.Ltr ? 0 : 1] + 1} - ${value[$dir == ReadingDirection.Ltr ? 1 : 0] + 1}`
				: `${value}`
		}))
	);
	const {
		elements: { trigger, menu, option },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect<Page>({
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
			set(_value) {
				const value = isArray(_value)
					? _value[get(readingDirection) == ReadingDirection.Ltr ? 0 : 1]
					: _value;
				currentPageContext.set(value);
			},
			update(updater) {
				const _value = updater(get(currentPageSelectedReadable)).value;
				const value = isArray(_value)
					? _value[get(readingDirection) == ReadingDirection.Ltr ? 0 : 1]
					: _value;
				currentPageContext.set(value);
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
				{#each $options as { value, label }}
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
		li.isSelected:hover {
			background-color: color-mix(in srgb, var(--primary) 70%, var(--accent-hover) 30%);
		}
		li.isSelected:active {
			background-color: color-mix(in srgb, var(--primary) 70%, var(--accent-active) 30%);
		}
	}
	.input {
		display: grid;
	}
</style>
