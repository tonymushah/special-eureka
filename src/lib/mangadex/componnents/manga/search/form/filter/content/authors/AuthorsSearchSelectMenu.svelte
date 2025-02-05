<script lang="ts">
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { melt, type AnyMeltElement, type Tag } from "@melt-ui/svelte";
	import type { Readable } from "svelte/store";
	import { slide } from "svelte/transition";

	interface Props {
		open: Readable<boolean>;
		toObserve?: HTMLElement;
		currentAuthorSearch: Readable<Tag[]>;
		isSelected: Readable<(value: unknown) => boolean>;
		option: AnyMeltElement;
		menu: AnyMeltElement;
		isFetching: Readable<boolean>;
		hasNext: boolean;
	}
	let {
		open,
		toObserve = $bindable(),
		currentAuthorSearch,
		isFetching,
		isSelected,
		option,
		menu,
		hasNext
	}: Props = $props();
</script>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each $currentAuthorSearch as author (author.id)}
					<li
						use:melt={$option({ value: author.id, label: author.value })}
						class:isSelected={$isSelected(author.id)}
					>
						<h4>{author.value}</h4>
					</li>
				{/each}
				{#if !$isFetching && hasNext}
					<div bind:this={toObserve}></div>
				{/if}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
		z-index: 10000;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);

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
		li[data-highlighted] {
			background-color: var(--accent-hover);
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
</style>
