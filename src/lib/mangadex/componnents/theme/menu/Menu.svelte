<script lang="ts">
	import { computePosition, flip } from "@floating-ui/dom";
	import type { Item } from "../context-menu/base";
	import ContextMenuBase from "../context-menu/base/ContextMenuBase.svelte";

	export let target: HTMLElement | undefined;
	export let isOpen: boolean = false;
	export let items: Item[] = [];
	let menu: HTMLDivElement;
	async function openMenu() {
		if (target) {
			const { x: _x, y: _y } = await computePosition(target, menu, {
				middleware: [flip()],
				placement: "bottom"
			});
			Object.assign(menu.style, {
				top: `${_y}px`,
				left: `${_x}px`
			});
		}
	}
	$: if (isOpen) {
		openMenu().catch(() => {
			isOpen = false;
		});
	}
</script>

<div class="menu" class:isOpen bind:this={menu}>
	<ContextMenuBase {items} tabindex={0} />
</div>

<style lang="scss">
	.menu {
		display: none;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	.menu.isOpen {
		display: block;
	}
</style>
