<script lang="ts" generics="T">
	import SomeDiv from "../SomeDiv.svelte";

	import type { Item } from "../context-menu/base";

	import Menu from "./Menu.svelte";
	import type { MenuItem } from "./index";

	interface Props {
		target: HTMLElement | undefined;
		isOpen?: boolean;
		items?: MenuItem<T>[];
		onSelect?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLDivElement;
				value: T;
			}
		) => any;
	}

	let { target, isOpen = $bindable(false), items = [], onSelect }: Props = $props();

	let menuItems = $derived(
		items.map<Item>((i) => ({
			onClick(e) {
				onSelect?.({
					...e,
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
