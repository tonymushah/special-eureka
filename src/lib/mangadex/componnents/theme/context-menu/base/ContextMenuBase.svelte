<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import ContextMenuItem from "./ContextMenuItem.svelte";
	import type { Item } from ".";
	import SomeDiv from "../../SomeDiv.svelte";
	const dispatch = createEventDispatcher<{
		menuItemClick: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
	export let items: (Item | undefined)[];
	export let tabindex: number | null;
	export let font_size: string = "var(--font-size)";
	export let menu_padding: string = "0.5em";
</script>

<SomeDiv --menu-item-padding={menu_padding} --font-size={font_size}>
	<div
		on:contextmenu={(e) => {
			e.preventDefault();
		}}
		class="menu"
		role="menu"
		{tabindex}
	>
		{#each items as item, index}
			{#if item}
				<ContextMenuItem
					icon={item.icon}
					label={item.label}
					tabindex={index}
					on:click={async (e) => {
						const onClick = item?.onClick;
						if (onClick) {
							const res = onClick(e);
							if (typeof res == "object") {
								await res;
							}
						}
						dispatch("menuItemClick", e.detail);
					}}
					isDisabled={item.disabled}
				/>
				{#if index < items.length - 1}
					<hr />
				{/if}
			{/if}
		{/each}
	</div>
</SomeDiv>

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
