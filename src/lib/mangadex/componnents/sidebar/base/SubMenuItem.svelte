<script lang="ts">
	import { createEventDispatcher, type Snippet } from "svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import MenuLink from "./MenuLink.svelte";
	interface Props {
		label: string;
		href?: string;
		icon?: Snippet;
		suffixIcon?: Snippet;
	}
	let { label, href, icon, suffixIcon }: Props = $props();

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
</script>

<MenuLink {href} on:click>
	<MenuBase>
		<MenuIcons>
			{@render icon?.()}
			{@render suffixIcon?.()}
			<MenuLabel {label} />
		</MenuIcons>
	</MenuBase>
</MenuLink>
