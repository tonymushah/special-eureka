<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import { type AnyMeltElement, emptyMeltElement, melt } from "@melt-ui/svelte";
	import ContextMenuItem from "./ContextMenuItem.svelte";
	import type { Item } from ".";
	import SomeDiv from "../../SomeDiv.svelte";
	import MangaDexVarThemeProvider from "../../MangaDexVarThemeProvider.svelte";
	const dispatch = createEventDispatcher<{
		menuItemClick: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
		};
	}>();
	export let items: (Item | undefined)[];
	export let font_size: string = "var(--font-size)";
	export let menu_padding: string = "0.5em";
	export let menu: AnyMeltElement = emptyMeltElement;
	export let item_: AnyMeltElement = emptyMeltElement;
	export let separator: AnyMeltElement = emptyMeltElement;
	export let arrow: AnyMeltElement = emptyMeltElement;
</script>

<div class="menu" use:melt={$menu}>
	<SomeDiv --menu-item-padding={menu_padding} --font-size={font_size}>
		<MangaDexVarThemeProvider>
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
						element={item_}
					/>
					{#if index < items.length - 1}
						<hr use:melt={$separator} />
					{/if}
				{/if}
			{/each}
			<div use:melt={$arrow} />
		</MangaDexVarThemeProvider>
	</SomeDiv>
</div>

<style lang="scss">
	div.menu {
		width: fit-content;
		display: flex;
		flex-direction: column;
		border-radius: 0.25em;
		height: fit-content;
		overflow: hidden;
		z-index: 1;
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
