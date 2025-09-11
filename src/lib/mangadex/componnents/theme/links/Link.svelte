<script lang="ts">
	import { goto } from "$app/navigation";
	import contextMenu, {
		ContextMenuItemProvider
	} from "@special-eureka/core/commands/contextMenu";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import registerContextMenuEvent, {
		getContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { onDestroy } from "svelte";
	interface Props {
		variant?: "primary" | "base";
		href: string;
		ext_href?: string | undefined;
		children?: import("svelte").Snippet;
		onclick?: (e?: MouseEvent & { currentTarget: EventTarget & HTMLElement }) => any;
	}
	let unlistens: UnlistenFn[] = [];
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	let { variant = "primary", href, ext_href = undefined, children, onclick }: Props = $props();
	let primary = $derived(variant == "primary");
	let base = $derived(variant == "base");
</script>

<a
	{href}
	{onclick}
	class:primary
	class:base
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true,
		includeContext: false,
		additionalMenus() {
			const items = [
				ContextMenuItemProvider.menuItem({
					text: "Open",
					action() {
						goto(href);
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open in a new window",
					action() {
						openNewWindow(currentLocationWithNewPath(href));
					}
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open external link",
					enabled: ext_href != undefined,
					action() {
						if (ext_href) {
							openUrl(ext_href);
						}
					}
				})
			];

			return items;
		}
	})}
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
