<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import ContextMenuLink from "./context-menu/ContextMenuLink.svelte";
	import { Menu, MenuItem } from "@tauri-apps/api/menu";
	import mouseEventMenu from "$lib/utils/mouseEventMenu";
	import { goto } from "$app/navigation";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import openNewWindow from "$lib/commands/openNewWindow";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import contextMenu, { ContextMenuItemProvider } from "$lib/commands/contextMenu";
	interface Props {
		variant?: "primary" | "base";
		href: string;
		ext_href?: string | undefined;
		children?: import("svelte").Snippet;
	}
	let unlistens: UnlistenFn[] = [];
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	let { variant = "primary", href, ext_href = undefined, children }: Props = $props();
	let primary = $derived(variant == "primary");
	let base = $derived(variant == "base");
</script>

<a
	{href}
	class:primary
	class:base
	oncontextmenu={async (e) => {
		e.preventDefault();
		await contextMenu(
			[
				ContextMenuItemProvider.menuItem({
					text: "Open",
					action: () => {
						goto(href);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open in a new window",
					action: () => {
						openNewWindow(href);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open External Link",
					action: () => {
						if (ext_href) openUrl(ext_href);
					}
				})
			],
			e
		);
	}}
>
	{@render children?.()}
</a>

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
