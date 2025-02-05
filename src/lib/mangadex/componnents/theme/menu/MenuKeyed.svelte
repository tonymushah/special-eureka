<script lang="ts" generics="T">
	import SomeDiv from "../SomeDiv.svelte";

	import { createEventDispatcher } from "svelte";
	import type { Item } from "../context-menu/base";

	import Menu from "./Menu.svelte";
	import type { MenuItem } from "./index";

	interface Props {
		target: HTMLElement | undefined;
		isOpen?: boolean;
		items?: MenuItem<T>[];
	}

	let { target, isOpen = $bindable(false), items = [] }: Props = $props();

	const dispatch = createEventDispatcher<{
		onSelect: MouseEvent & {
			currentTarget: EventTarget & HTMLDivElement;
			value: T;
		};
	}>();

	let menuItems = $derived(
		items.map<Item>((i) => ({
			onClick(e) {
				console.log(i.key);
				dispatch("onSelect", {
					...e.detail,
					value: i.key
				});
				isOpen = false;
			},
			icon: i.icon ?? SomeDiv,
			label: i.label
		}))
	);
</script>

<Menu {target} bind:isOpen items={menuItems} />
