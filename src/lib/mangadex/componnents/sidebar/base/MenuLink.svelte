<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	import { page } from "$app/stores";
	import { createEventDispatcher } from "svelte";

	interface Props {
		href?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href = undefined, children }: Props = $props();
	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLAnchorElement;
		};
	}>();
    let active = $derived($page.url.pathname == href);
</script>

<a class:active {href} onclick={bubble('click')}>
    {@render children?.()}
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