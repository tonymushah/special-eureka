<script lang="ts">
	import { goto } from "$app/navigation";
	import { WebviewWindow, getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
	import ContextMenu from "../../context-menu/ContextMenu.svelte";
	import OpenLinkIcon from "../icons/OpenLinkIcon.svelte";
	import OpenNewWindowIcon from "../icons/OpenNewWindowIcon.svelte";
	import { v4 } from "uuid";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { onDestroy } from "svelte";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { Direction, RtlSidebarSubDocument } from "@mangadex/gql/graphql";
	import OpenExtLinkIcon from "../icons/OpenExtLinkIcon.svelte";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import { addToast } from "../../toast/Toaster.svelte";
	const appWindow = getCurrentWebviewWindow();
	const client = getContextClient();
	const rtl_sidebar_query = subscriptionStore({
		client,
		query: RtlSidebarSubDocument,
		variables: {}
	});
	interface Props {
		href: string;
		ext_href?: string | undefined;
		children?: import("svelte").Snippet;
	}

	let { href, ext_href = undefined, children }: Props = $props();

	let unlistens: UnlistenFn[] = [];
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	let decorated = $derived($isDefaultDecoration);
	let items = $derived([
		{
			icon: OpenLinkIcon,
			label: "Open",
			onClick() {
				goto(href);
			}
		},
		{
			icon: OpenNewWindowIcon,
			label: "Open in a new Window",
			async onClick() {
				const window = new WebviewWindow(`main-${v4()}`, {
					url: href,
					decorations: decorated
				});
				unlistens.push(
					await window.once("tauri://created", () => {
						addToast({
							data: {
								title: "A new window was opened",
								variant: "green"
							}
						});
					})
				);
				unlistens.push(
					await window.once<string>("tauri://error", (e) => {
						addToast({
							data: {
								title: "Error when creating a new window",
								description: e.payload,
								variant: "green"
							}
						});
					})
				);
			}
		},
		ext_href
			? {
					icon: OpenExtLinkIcon,
					label: "Open External Link",
					async onClick() {
						if (ext_href) openUrl(ext_href);
					}
				}
			: undefined
	]);
</script>

<ContextMenu {items}>
	{@render children?.()}
</ContextMenu>
