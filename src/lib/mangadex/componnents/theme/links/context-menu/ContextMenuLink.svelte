<script lang="ts">
	import { goto } from "$app/navigation";
	import { WebviewWindow, appWindow } from "@tauri-apps/api/window";
	import ContextMenu from "../../context-menu/ContextMenu.svelte";
	import OpenLinkIcon from "../icons/OpenLinkIcon.svelte";
	import OpenNewWindowIcon from "../icons/OpenNewWindowIcon.svelte";
	import { v4 } from "uuid";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { onDestroy } from "svelte";
	import Toastify from "toastify-js";
	import { getContextClient, subscriptionStore } from "@urql/svelte";
	import { Direction, RtlSidebarSubDocument } from "@mangadex/gql/graphql";
	import { sub_end } from "@mangadex/utils";
	import OpenExtLinkIcon from "../icons/OpenExtLinkIcon.svelte";
	import { open } from "@tauri-apps/api/shell";
	const client = getContextClient();
	const sub_id = v4();
	const rtl_sidebar_query = subscriptionStore({
		client,
		query: RtlSidebarSubDocument,
		variables: {
			sub_id
		}
	});
	export let href: string;
	export let ext_href: string | undefined = undefined;
	let unlistens: UnlistenFn[] = [];
	onDestroy(() => {
		unlistens.forEach((u) => u());
		sub_end(sub_id);
	});
	$: items = [
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
				const window = new WebviewWindow(v4(), {
					url: href
				});
				unlistens.push(
					await window.once("tauri://created", () => {
						const toast = Toastify({
							text: "A new window was opened",
							gravity: "bottom",
							position:
								$rtl_sidebar_query.data?.watchSidebarDirection == Direction.Rtl
									? "left"
									: "right",
							close: true
						});
					})
				);
				unlistens.push(
					await window.once<string>("tauri://error", (e) => {
						const toast = Toastify({
							text: `Error when creating a new window ${e}`,
							gravity: "bottom",
							position:
								$rtl_sidebar_query.data?.watchSidebarDirection == Direction.Rtl
									? "left"
									: "right",
							close: true
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
						if (ext_href) open(ext_href);
					}
				}
			: undefined
	];
</script>

<ContextMenu {items} tabindex={0}>
	<slot />
</ContextMenu>
