<!--
    BUG I don't know why the primary doesn't work
-->
<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import getChapterDoublePageCurrentPageIndex from "@mangadex/componnents/chapter/page/readinMode/doublePage/utils/getChapterDoublePageCurrentPageIndex";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { every, isArray } from "lodash";
	import { derived, get, type Writable } from "svelte/store";
	import { slide } from "svelte/transition";
	import { Direction as ReadingDirection } from "@mangadex/gql/graphql";
	import { getCurrentChapterDirection } from "@mangadex/componnents/chapter/page/contexts/readingDirection";
	import type { DoublePageIndex } from "@mangadex/stores/chapter/pages";
	import getCurrentChapterImages from "@mangadex/componnents/chapter/page/utils/getCurrentChapterImages";
	import { type SelectOption } from "@mangadex/utils/legacy/melt-ui-select-option";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";

	const readingDirection = getCurrentChapterDirection();
	type Page = DoublePageIndex;
	const currentPageContext = getChapterCurrentPageContext();
	const images = getCurrentChapterImages();
	const doublePages = derived(images, ($images) => $images.pagesAsDoublePageIndexes());
	const currentDoublePageIndex = getChapterDoublePageCurrentPageIndex();
	const currentPageSelectedReadable = derived(
		[currentDoublePageIndex, doublePages, readingDirection],
		([$index, $pages, $dir]) => {
			const value = $pages[$index];
			const label = isArray(value)
				? `${value[$dir == ReadingDirection.Ltr ? 0 : 1] + 1} - ${value[$dir == ReadingDirection.Ltr ? 1 : 0] + 1}`
				: `${value + 1}`;
			return {
				value /*: isArray(value) && $dir == ReadingDirection.Rtl ? value.toReversed() : value*/,
				label
			} as SelectOption<Page>;
		}
	);
	const options = derived([doublePages, readingDirection], ([$images, $dir]) =>
		$images.map<SelectOption<[number, number] | number>>((value) => ({
			value,
			label: isArray(value)
				? `${value[$dir == ReadingDirection.Ltr ? 0 : 1] + 1} - ${value[$dir == ReadingDirection.Ltr ? 1 : 0] + 1}`
				: `${value + 1}`
		}))
	);

	const selected: Writable<SelectOption<Page>> = {
		subscribe(run, invalidate) {
			return currentPageSelectedReadable.subscribe(run, invalidate);
		},
		set(_value) {
			const value = isArray(_value.value)
				? _value.value[get(readingDirection) == ReadingDirection.Ltr ? 0 : 1]
				: _value.value;
			currentPageContext.set(value);
		},
		update(updater) {
			const _value = updater(get(currentPageSelectedReadable)).value;
			const value = isArray(_value)
				? _value[get(readingDirection) == ReadingDirection.Ltr ? 0 : 1]
				: _value;
			currentPageContext.set(value);
		}
	};
	const isSelected = (value: Page) => {
		if ($selected == undefined) {
			return false;
		}
		if (isArray(value)) {
			return every(value, (i) => {
				if (isArray($selected.value)) {
					return $selected.value.includes(i);
				} else {
					return false;
				}
			});
		} else if (!isArray($selected.value)) {
			return value == $selected.value;
		} else {
			return false;
		}
	};

	let open = $state(false);
	let trigger = $state<HTMLElement | undefined>();
	let menu = $state<HTMLElement | undefined>();
	floatingUImenu({
		open: () => open,
		triggerElement: () => trigger,
		menuElement: () => menu,
		showMenuDisplay: "flex",
		setOpen: (o) => (open = o),
		sameWidth: true,
		closeOnClick: true
	});
</script>

<div class="layout">
	<div class="input" bind:this={trigger}>
		<ButtonAccent
			onclick={() => {
				open = !open;
			}}
		>
			Page: {$selected.label}
		</ButtonAccent>
	</div>
</div>

{#if open}
	<div class="menu-outer" bind:this={menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $options as { value, label }}
					<button
						class="li"
						onclick={() => {
							$selected = {
								value,
								label
							};
						}}
						class:isSelected={isSelected(value)}
					>
						<h4>{label}</h4>
					</button>
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
		.li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			background: transparent;
			border: 0px;
			font-family: var(--fonts);
			h4 {
				margin: 0px;
			}
		}
		.li:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		.li:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		.li.isSelected {
			background-color: var(--primary);
		}
		.li.isSelected:hover {
			background-color: color-mix(in srgb, var(--primary) 70%, var(--accent-hover) 30%);
		}
		.li.isSelected:active {
			background-color: color-mix(in srgb, var(--primary) 70%, var(--accent-active) 30%);
		}
	}
	.input {
		display: grid;
	}
</style>
