<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { type Snippet } from "svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import MenuLink from "./MenuLink.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLAnchorElement;
			}
		) => any;
		oncontextmenu?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLAnchorElement;
			}
		) => any;
	}
	interface Props extends Events {
		label: string;
		href?: string;
		icon?: Snippet;
		suffixIcon?: Snippet;
	}
	let { label, href, icon, suffixIcon, onclick, oncontextmenu }: Props = $props();

	let collapsed = $derived($isOpen);
</script>

<MenuLink {href} {onclick} {oncontextmenu}>
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
