<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import openNewWindow from "@special-eureka/core/commands/openNewWindow";
	import registerContextMenuEvent, {
		getContextMenuContext
	} from "@special-eureka/core/utils/contextMenuContext";
	import { currentLocationWithNewPath } from "@special-eureka/core/utils/url";
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLAnchorElement;
			}
		) => any;
		oncontextmenu?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLAnchorElement;
			}
		) => any;
	}
	interface Props extends Events {
		href?: string | undefined;
		children?: import("svelte").Snippet;
	}
	const ctxItems = getContextMenuContext();
	let {
		href = undefined,
		children,
		onclick,
		oncontextmenu = registerContextMenuEvent({
			stopPropagation: true,
			preventDefault: true,
			includeContext: false,
			addSeparator: false,
			additionalMenus: () => [
				ContextMenuItemProvider.menuItem({
					text: "Open",
					action() {
						if (href) {
							goto(href);
						}
					},
					enabled: href != undefined && $page.url.pathname != href
				}),
				ContextMenuItemProvider.menuItem({
					text: "Open a new window",
					action() {
						if (href) {
							openNewWindow(currentLocationWithNewPath(href));
						}
					},
					enabled: href != undefined
				}),
				ContextMenuItemProvider.seperator(),
				...ctxItems()
			]
		})
	}: Props = $props();

	let active = $derived($page.url.pathname == href);
</script>

<a class:active {href} {onclick} {oncontextmenu}>
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
