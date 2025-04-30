<script lang="ts">
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import type { Item } from ".";
	import MangaDexVarThemeProvider from "../../MangaDexVarThemeProvider.svelte";
	import SomeDiv from "../../SomeDiv.svelte";
	import ContextMenuItem from "./ContextMenuItem.svelte";

	interface Props {
		items: (Item | undefined)[];
		font_size?: string;
		menu_padding?: string;
		menu?: AnyMeltElement;
		item_?: AnyMeltElement;
		separator?: AnyMeltElement;
		arrow?: AnyMeltElement;
		tabindex?: number;
		onMenuItemClick: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
			}
		) => any;
	}

	let {
		items,
		font_size = "var(--font-size)",
		menu_padding = "0.5em",
		menu = emptyMeltElement,
		item_ = emptyMeltElement,
		separator = emptyMeltElement,
		arrow = emptyMeltElement,
		tabindex = 0,
		onMenuItemClick
	}: Props = $props();
</script>

<div class="menu" use:melt={$menu}>
	<MangaDexVarThemeProvider>
		<div class="inner">
			<SomeDiv --menu-item-padding={menu_padding} --font-size={font_size}>
				{#each items as item, index}
					{#if item}
						<ContextMenuItem
							icon={item.icon}
							label={item.label}
							{tabindex}
							onClick={async (e) => {
								const onClick = item?.onClick;
								if (onClick) {
									const res = onClick(e);
									if (typeof res == "object") {
										await res;
									}
								}
								onMenuItemClick(e);
							}}
							isDisabled={item.disabled}
							element={item_}
						/>
						{#if index < items.length - 1}
							<hr use:melt={$separator} />
						{/if}
					{/if}
				{/each}
				<div use:melt={$arrow}></div>
			</SomeDiv>
		</div>
	</MangaDexVarThemeProvider>
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
		.inner {
			border-color: var(--mid-tone);
			border-style: solid;
			border-width: 1px;
		}
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
