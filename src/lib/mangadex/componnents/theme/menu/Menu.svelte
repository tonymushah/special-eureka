<script lang="ts">
	import { computePosition, flip } from "@floating-ui/dom";
	import type { Item } from "../context-menu/base";
	import ContextMenuBase from "../context-menu/base/ContextMenuBase.svelte";

	interface Props {
		target: HTMLElement | undefined;
		isOpen?: boolean;
		items?: Item[];
	}

	let { target, isOpen = $bindable(false), items = $bindable([]) }: Props = $props();
	let menu: HTMLDivElement | undefined = $state();

	async function openMenu() {
		if (target && menu) {
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

	$effect(() => {
		if (isOpen) {
			openMenu().catch(() => {
				isOpen = false;
			});
		}
	});
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
		height: var(--menu-height);
		overflow: var(--menu-overflow);
	}
	.menu.isOpen {
		display: block;
	}
</style>
