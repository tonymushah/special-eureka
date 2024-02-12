<script lang="ts">
	import { page } from "$app/stores";
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
        color: var(--text-color);
        transition: color 300ms ease-in-out;
    }
    a.active {
        color: var(--primary-l1);
    }
</style>