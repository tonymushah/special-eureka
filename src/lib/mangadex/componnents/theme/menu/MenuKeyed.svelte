<script lang="ts" generics="T">
	import SomeDiv from "../SomeDiv.svelte";

	import { createEventDispatcher } from "svelte";
	import type { Item } from "../context-menu/base";

	import { computePosition, flip } from "@floating-ui/dom";
	import type { MenuItem } from "./index";
	import ContextMenuBase from "../context-menu/base/ContextMenuBase.svelte";
	import Menu from "./Menu.svelte";

	export let target: HTMLElement | undefined;
	let isOpen: boolean = false;
	export let items: MenuItem<T>[] = [];
	let menu: HTMLDivElement;
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
	const dispatch = createEventDispatcher<{
		onSelect: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
			value: T;
		};
	}>();
	$: if (isOpen) {
		openMenu().catch(() => {
			isOpen = false;
		});
	}
	$: menuItems = items.map<Item>((i) => ({
		onClick(e) {
			dispatch("onSelect", {
				...e.detail,
				value: i.key
			});
			isOpen = false;
		},
		icon: i.icon ?? SomeDiv,
		label: i.label
	}));
</script>

<Menu {target} bind:isOpen bind:items={menuItems} />
