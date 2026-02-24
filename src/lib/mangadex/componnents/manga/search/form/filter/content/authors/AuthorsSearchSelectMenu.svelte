<script lang="ts">
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import type { Tag } from "@mangadex/utils/legacy/melt-ui-tag";
	import type { Writable } from "svelte/store";
	import { slide } from "svelte/transition";

	interface Props {
		open: boolean;
		toObserve?: HTMLElement;
		currentAuthorSearch: Tag[];
		isFetching: boolean;
		hasNext: boolean;
		tags: Writable<Tag[]>;
		menu?: HTMLElement;
	}
	let {
		open,
		toObserve = $bindable(),
		currentAuthorSearch,
		isFetching,
		hasNext,
		tags,
		menu = $bindable()
	}: Props = $props();
</script>

{#if open}
	<div class="menu-outer" bind:this={menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				{#each currentAuthorSearch as author (author.id)}
					<button
						class="li"
						class:isSelected={$tags.includes(author)}
						onclick={() => {
							tags.update((tags) => {
								return new Set([...tags, author]).values().toArray();
							});
						}}
					>
						<h4>{author.value}</h4>
					</button>
				{/each}
				{#if !isFetching && hasNext}
					<div bind:this={toObserve}></div>
				{/if}
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: none;
		flex-direction: column;
		height: 200px;
		z-index: 100;
		position: absolute;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		.li {
			padding-left: 1em;
			transition: background-color 50ms ease-in-out;
			background-color: transparent;
			color: var(--text-color);
			border: 0px;
			align-items: center;
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
	}
</style>
