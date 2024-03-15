<script lang="ts">
	import ContextMenuLink from "./context-menu/ContextMenuLink.svelte";
	export let variant: "primary" | "base" = "primary";
	export let href: string;
	export let ext_href: string | undefined = undefined;
	$: primary = variant == "primary";
	$: base = variant == "base";
</script>

<ContextMenuLink {href} {ext_href}>
	<a {href} class:primary class:base>
		<slot />
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
