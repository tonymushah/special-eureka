<script lang="ts">
	import { computePosition, flip } from "@floating-ui/dom";
	import type { Item } from "../context-menu/base";
	import ContextMenuBase from "../context-menu/base/ContextMenuBase.svelte";

	interface Props {
		target: HTMLElement | undefined;
		isOpen?: boolean;
		items?: Item[];
		sameWidth?: boolean;
		fitContent?: boolean;
	}

	let {
		target,
		isOpen = $bindable(false),
		items = $bindable([]),
		sameWidth,
		fitContent
	}: Props = $props();
	let menu: HTMLDivElement | undefined = $state();

	async function openMenu() {
		if (target && menu) {
			const { x: _x, y: _y } = await computePosition(target, menu, {
				middleware: [flip()],
				placement: "bottom"
			});
			Object.assign(menu.style, {
				top: `${_y}px`,
				left: `${_x}px`,
				width: sameWidth ? `${target.clientWidth}px` : ``
			});
		}
	}

	$effect(() => {
		if (isOpen) {
			openMenu().catch(() => {
				isOpen = false;
			});
		}
	});
</script>

<div class="menu" class:isOpen bind:this={menu}>
	<ContextMenuBase {items} tabindex={0} {fitContent} />
</div>

<style lang="scss">
	.menu {
		display: none;
		position: absolute;
		top: 0px;
		left: 0px;
		z-index: 10;
	}
	.menu.isOpen {
		display: block;
	}
</style>
