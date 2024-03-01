<script lang="ts">
	import { goto } from "$app/navigation";
	import ContextMenuLink from "./context-menu/ContextMenuLink.svelte";

	export let href: string;
	export let ext_href: string | undefined = undefined;
</script>

<ContextMenuLink {href} {ext_href}>
	<a {href}><slot /></a>
</ContextMenuLink>

<style lang="scss">
	a {
		text-decoration: none;
		color: var(--primary);
		transition:
			color 300ms ease-in-out,
			text-decoration 300ms ease-in-out;
	}
	a:hover {
		text-decoration: underline;
		color: var(--primary-l1);
	}
	a:active {
		color: var(--primary-l2);
	}
</style>
