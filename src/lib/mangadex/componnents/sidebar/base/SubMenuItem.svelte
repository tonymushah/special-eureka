<script lang="ts">
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
	}
	interface Props extends Events {
		label: string;
		href?: string;
		icon?: Snippet;
		suffixIcon?: Snippet;
	}
	let { label, href, icon, suffixIcon, onclick }: Props = $props();
</script>

<MenuLink {href} {onclick}>
	<MenuBase>
		<MenuIcons>
			{@render icon?.()}
			{@render suffixIcon?.()}
			<MenuLabel {label} />
		</MenuIcons>
	</MenuBase>
</MenuLink>
