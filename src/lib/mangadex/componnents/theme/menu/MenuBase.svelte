<script lang="ts">
	import SomeDiv from "../SomeDiv.svelte";
	import MangaDexVarThemeProvider from "../MangaDexVarThemeProvider.svelte";
	import ContextMenuItem from "./MenuBaseItem.svelte";
	import type { ComponentProps } from "svelte";
	type MenuItem = ComponentProps<typeof ContextMenuItem>;
	interface Props {
		items: (MenuItem | undefined)[];
		font_size?: string;
		menu_padding?: string;
		tabindex?: number;
		onMenuItemClick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => unknown;
		fitContent?: boolean;
	}

	let {
		items,
		font_size = "var(--font-size)",
		menu_padding = "0.5em",
		tabindex = 0,
		onMenuItemClick,
		fitContent
	}: Props = $props();
</script>

<div class="menu" class:fitContent>
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
								onMenuItemClick?.(e);
							}}
							isDisabled={item.isDisabled}
						/>
						{#if index < items.length - 1}
							<hr />
						{/if}
					{/if}
				{/each}
			</SomeDiv>
		</div>
	</MangaDexVarThemeProvider>
</div>

<style lang="scss">
	div.menu {
		display: flex;
		flex-direction: column;
		border-radius: 0.25em;
		height: fit-content;
		overflow-y: auto;
		max-height: var(--menu-height);
		z-index: 1;
		.inner {
			border-color: var(--mid-tone);
			border-style: solid;
			border-width: 1px;
		}
	}
	div.menu.fitContent {
		width: fit-content;
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
