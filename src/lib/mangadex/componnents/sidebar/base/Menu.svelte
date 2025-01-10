<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
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
	let collapsed = $derived($isOpen);
</script>

<MenuLink {href} on:click>
	<MenuBase {collapsed}>
		<MenuIcons>
			{#snippet _icon()}
				{#if icon}
					{@render icon()}
				{/if}
			{/snippet}
			<MenuLabel {label} {collapsed} />
			{#snippet _suffixIcon()}
				{#if suffixIcon}
					{@render suffixIcon()}
				{/if}
			{/snippet}
		</MenuIcons>
	</MenuBase>
</MenuLink>
