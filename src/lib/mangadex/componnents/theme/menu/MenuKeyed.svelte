<script lang="ts" generics="T">
	import SomeDiv from "../SomeDiv.svelte";

	import { createEventDispatcher } from "svelte";
	import type { Item } from "../context-menu/base";

	import { computePosition, flip } from "@floating-ui/dom";
	import type { MenuItem } from "./index";
	import ContextMenuBase from "../context-menu/base/ContextMenuBase.svelte";
	import Menu from "./Menu.svelte";

	export let target: HTMLElement | undefined;
	export let isOpen: boolean = false;
	export let items: MenuItem<T>[] = [];

	const dispatch = createEventDispatcher<{
		onSelect: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
			value: T;
		};
	}>();

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
