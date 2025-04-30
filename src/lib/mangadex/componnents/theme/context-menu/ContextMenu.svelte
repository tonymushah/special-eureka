<script lang="ts">
	import { createContextMenu, melt } from "@melt-ui/svelte";
	import { writable } from "svelte/store";
	import type { Item } from "./base";
	import ContextMenuBase from "./base/ContextMenuBase.svelte";
	let content: HTMLDivElement | undefined = $state(undefined);
	const isOpen = writable(false);
	const {
		elements: { menu, item, trigger, arrow, separator }
	} = createContextMenu({
		open: isOpen
	});
	interface Props {
		items: (Item | undefined)[];
		font_size?: string;
		menu_padding?: string;
		children?: import("svelte").Snippet;
	}

	let {
		items,
		font_size = "var(--font-size)",
		menu_padding = "0.25em",
		children
	}: Props = $props();
</script>

<div class="content" bind:this={content} use:melt={$trigger} role="document">
	{@render children?.()}
</div>

<ContextMenuBase {menu_padding} {font_size} {items} {separator} {menu} item_={item} {arrow} />

<style lang="scss">
	.content {
		display: contents;
	}
</style>
