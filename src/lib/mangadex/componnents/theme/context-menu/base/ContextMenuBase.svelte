<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import ContextMenuItem from "./ContextMenuItem.svelte";
	import type { Item } from ".";
	const dispatch = createEventDispatcher<{
		menuItemClick: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
	export let items: Item[];
	export let tabindex: number | null;
</script>

<div
	on:contextmenu={(e) => {
		e.preventDefault();
	}}
	class="menu"
	role="menu"
	{tabindex}
>
	{#each items as { icon, label, onClick }, index}
		<ContextMenuItem
			{icon}
			{label}
			tabindex={index}
			on:click={async (e) => {
				if (onClick) {
					const res = onClick(e);
					if (typeof res == "object") {
						await res;
					}
				}
				dispatch("menuItemClick", e.detail);
			}}
		/>
		{#if index < items.length - 1}
			<hr />
		{/if}
	{/each}
</div>

<style lang="scss">
	div.menu {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border-radius: 0.25em;
		height: fit-content;
		overflow: hidden;
	}
	hr {
		width: 100%;
		margin: 0px;
		color: var(--mid-tone);
		background-color: var(--mid-tone);
		border: none;
		height: 1px;
	}
</style>
