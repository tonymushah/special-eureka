<script lang="ts">
	import { createContextMenu, melt } from "@melt-ui/svelte";
	import { writable } from "svelte/store";
	import type { Item } from "./base";
	import ContextMenuBase from "./base/ContextMenuBase.svelte";
	let content: HTMLDivElement | undefined = undefined;
	const isOpen = writable(false);
	const {
		elements: { menu, item, trigger, arrow, separator }
	} = createContextMenu({
		open: isOpen
	});
	export let items: (Item | undefined)[];
	export let font_size: string = "var(--font-size)";
	export let menu_padding: string = "0.25em";
</script>

<div class="content" bind:this={content} use:melt={$trigger} role="document">
	<slot />
</div>

<ContextMenuBase {menu_padding} {font_size} {items} {separator} {menu} item_={item} {arrow} />

<style lang="scss">
	.content {
		display: contents;
	}
</style>
