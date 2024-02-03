<script lang="ts">
    import { page } from "$app/stores";
	import sideDirGQLDoc from "@mangadex/gql-docs/sidebarSub";
	import { Direction } from "@mangadex/gql/graphql";
    import { sidebarState as isOpen } from "@mangadex/stores";
	import { sub_end } from "@mangadex/utils";
	import { Box, Text } from "@svelteuidev/core";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { createEventDispatcher, onDestroy } from "svelte";
	import MenuBase from "./MenuBase.svelte";
	import MenuLabel from "./MenuLabel.svelte";
	import { route } from "$lib/ROUTES";
	import MenuIcons from "./MenuIcons.svelte";
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
            <slot name="icon" slot="icon"/>
            <slot name="suffix-icon" slot="suffix-icon"/>
            <MenuLabel {label} bind:collapsed/>
        </MenuIcons>
	</MenuBase>
</MenuLink>
