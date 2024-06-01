<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { createEventDispatcher } from "svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuIcons from "./MenuIcons.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import MenuLink from "./MenuLink.svelte";
	export let label: string;
	export let href: string | undefined = undefined;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
	$: collapsed = $isOpen;
</script>

<MenuLink {href} on:click>
	<MenuBase bind:collapsed>
		<MenuIcons>
			<slot name="icon" slot="icon" />
			<slot name="suffix-icon" slot="suffix-icon" />
			<MenuLabel {label} bind:collapsed />
		</MenuIcons>
	</MenuBase>
</MenuLink>
