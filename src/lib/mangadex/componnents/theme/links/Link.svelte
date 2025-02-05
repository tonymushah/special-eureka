<script lang="ts">
	import ContextMenuLink from "./context-menu/ContextMenuLink.svelte";
	interface Props {
		variant?: "primary" | "base";
		href: string;
		ext_href?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let {
		variant = "primary",
		href,
		ext_href = undefined,
		children
	}: Props = $props();
	let primary = $derived(variant == "primary");
	let base = $derived(variant == "base");
</script>

<ContextMenuLink {href} {ext_href}>
	<a {href} class:primary class:base>
		{@render children?.()}
	</a>
</ContextMenuLink>

<style lang="scss">
	a {
		text-decoration: none;

		transition:
			color 300ms ease-in-out,
			text-decoration 300ms ease-in-out;
	}
	/*
	a:hover {
		text-decoration: underline;
	}
    */
	a.base {
		color: var(--text-color);
	}
	a.base:hover {
		color: var(--primary-l1);
	}
	a.base:active {
		color: var(--primary-l2);
	}
	a.primary {
		color: var(--primary);
	}
	a.primary:hover {
		color: var(--primary-l1);
	}
	a.primary:active {
		color: var(--primary-l2);
	}
</style>
