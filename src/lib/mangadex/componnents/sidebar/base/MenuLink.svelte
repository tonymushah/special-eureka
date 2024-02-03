<script lang="ts">
	import { page } from "$app/stores";
	import { route } from "$lib/ROUTES";
	import { createEventDispatcher } from "svelte";

    export let href: string | undefined = undefined;
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
    $: active = $page.url.pathname == href;
</script>

<a class:active {href} on:click>
    <slot/>
</a>

<style lang="scss">
    a {
        text-decoration: none;
        color: black;
    }
    a.active {
        color: #b34a00;
    }
</style>