<script lang="ts">
	import { page } from "$app/stores";
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLAnchorElement;
			}
		) => any;
	}
	interface Props extends Events {
		href?: string | undefined;
		children?: import("svelte").Snippet;
	}

	let { href = undefined, children, onclick }: Props = $props();

	let active = $derived($page.url.pathname == href);
</script>

<a class:active {href} {onclick}>
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
