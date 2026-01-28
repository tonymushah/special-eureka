<script lang="ts">
	import { getChapterCurrentPageContext } from "@mangadex/componnents/chapter/page/contexts/currentPage";
	import getCurrentChapterImages from "@mangadex/componnents/chapter/page/utils/getCurrentChapterImages";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { floatingUImenu } from "@mangadex/utils/floating-ui/menu.svelte";
	import type { SelectOption } from "@mangadex/utils/legacy/melt-ui-select-option";
	import { range } from "lodash";
	import { derived, get, type Writable } from "svelte/store";
	import { slide } from "svelte/transition";

	const currentPageContext = getChapterCurrentPageContext();
	const currentPageSelectedReadable = derived(currentPageContext, ($page) => {
		return {
			value: $page,
			label: `${$page + 1}`
		} as SelectOption<number>;
	});
	//const currentData = getCurrentChapterData();

	const options = derived(getCurrentChapterImages(), ($images) =>
		range(0, $images.getImages().length).map<SelectOption<number>>((index) => ({
			value: index,
			label: `${index + 1}`
		}))
	);
	const selected: Writable<SelectOption<number>> = {
		subscribe(run, invalidate) {
			return currentPageSelectedReadable.subscribe(run, invalidate);
		},
		set(value) {
			currentPageContext.set(value.value);
		},
		update(updater) {
			currentPageContext.set(updater(get(currentPageSelectedReadable)).value);
		}
	};
	function isSelected(val: number) {
		return $selected.value == val;
	}
	//onMount(() => options.subscribe(noop));
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
		closeOnClick: true,
		closeOnOutClick: true
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
	{#if open}
		<div class="menu-outer" bind:this={menu}>
			<MangaDexVarThemeProvider>
				<menu transition:slide={{ duration: 150, axis: "y" }}>
					{#each $options as { value, label } (value)}
						<button
							class="li"
							onclick={() => {
								$currentPageContext = value;
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
</div>

<style lang="scss">
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
		position: absolute;
	}
	.layout {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
		position: relative;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		overflow-y: auto;
		color: var(--text-color);
		padding-left: 0em;
		display: grid;
		.li {
			padding: 0px;
			padding-left: 1em;
			transition: background-color 40ms ease-in-out;
			background: transparent;
			border: 0px;
			font-family: var(--fonts);
			color: var(--text-color);
			h4 {
				margin: 0px;
				text-align: start;
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
