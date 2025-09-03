<script lang="ts">
	import { goto } from "$app/navigation";
	import contextMenu, {
		ContextMenuItemProvider
	} from "@special-eureka/core/commands/contextMenu";
	import { route } from "$lib/ROUTES";
	import isDefaultDecoration from "$lib/core/window-decoration/stores/isDefaultDecoration";
	import { client } from "@mangadex/gql/urql";
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { isMounted } from "@mangadex/stores/offlineIsMounted";
	import defaultContextMenuContent from "@mangadex/utils/defaultContextMenuContent";
	import { mount, unmount } from "@mangadex/utils/offline_app_state";
	import goto_sub_menu from "./goto_sub_menu";
	import SidebarBody from "./SidebarBody.svelte";
	import SidebarFooter from "./SidebarFooter.svelte";
	import SidebarHeader from "./SidebarHeader.svelte";
	import { isSidebarRtl } from "./states/isRtl";
	import { isSidebarFloating } from "./states/isSidebarFloating";
	import { showSidebar } from "./states/showSidebar";
</script>

<div
	class="sidebar"
	class:rtl={$isSidebarRtl}
	class:show={$showSidebar}
	class:float={$isSidebarFloating}
	class:defaultDecoration={$isDefaultDecoration}
>
	<aside
		class:collapsed={$isOpen}
		class:defaultDecoration={$isDefaultDecoration}
		oncontextmenu={async (e) => {
			e.preventDefault();
			await contextMenu(
				[
					...defaultContextMenuContent(),
					ContextMenuItemProvider.seperator(),
					ContextMenuItemProvider.menuItem({
						text: $isOpen ? "Unfold sidebar" : "Fold sidebar",
						action() {
							$isOpen = !$isOpen;
						}
					}),
					ContextMenuItemProvider.menuItem({
						text: $isSidebarRtl ? "Move sidebar to left" : "Move sidebar to right",
						action() {
							$isSidebarRtl = !$isSidebarRtl;
						}
					}),
					ContextMenuItemProvider.seperator(),
					ContextMenuItemProvider.menuItem({
						text: $isMounted ? "Unmount Offline Server" : "Mount OfflineServer",
						action() {
							if ($isMounted) {
								unmount(client).then(console.debug).catch(console.error);
							} else {
								mount(client).then(console.debug).catch(console.error);
							}
						}
					}),
					ContextMenuItemProvider.seperator(),
					goto_sub_menu(),
					ContextMenuItemProvider.seperator(),
					ContextMenuItemProvider.menuItem({
						text: "Settings",
						action() {
							goto(route("/mangadex/settings"));
						}
					})
				],
				e
			).catch(console.error);
		}}
	>
		<div class="header">
			<SidebarHeader />
		</div>
		<div class="body">
			<SidebarBody />
		</div>
		<div class="footer">
			<SidebarFooter />
		</div>
	</aside>
</div>

<style lang="scss">
	:root {
		--sidebar-transition-duration: 100ms;
	}
	.sidebar {
		display: none;
	}
	.sidebar.show {
		display: flex;
		height: 100%;
	}
	.sidebar.show.float {
		position: absolute;
		z-index: 10;
		top: 0;
		height: 100vh;
	}
	.sidebar.show.float:not(.rtl) {
		left: 0;
	}
	.sidebar.show.float:not(.rtl) {
		aside.collapsed {
			translate: -90px 0px;
		}
	}
	.sidebar.show.float:hover {
		aside.collapsed {
			translate: 0px 0px;
		}
	}
	.sidebar.show.float.rtl {
		right: 0;
	}
	.sidebar.show.float.rtl {
		aside.collapsed {
			translate: 90px 0px;
		}
	}
	aside {
		transition:
			width ease-in-out var(--sidebar-transition-duration),
			translate ease-in-out var(--sidebar-transition-duration);
		background-color: var(--accent-l1);
		width: 256px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 8px;
		height: -webkit-fill-available;
	}
	/*aside {
		height: 100%;
	}*/
	/*
	aside.defaultDecoration {
		height: 99vh;
	}*/
	.collapsed {
		width: 80px;
	}
	.header {
		transition: background-color 300ms ease-in-out;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.header:hover {
		background-color: var(--accent-l1-hover);
	}
	.body {
		padding-top: 20px;
		padding-bottom: 20px;
		display: flex;
		flex-direction: column;
		max-height: 75%;
		overflow-y: scroll;
		overflow-x: hidden;
	}
	.body::-webkit-scrollbar {
		display: none;
		width: 12px;
		border-radius: 0.25em;
	}
	.body:hover::-webkit-scrollbar {
		display: block;
	}
	.body::-webkit-scrollbar-thumb {
		border-radius: 0.25em;
		background-color: var(--scrollbar-color);
		transition: background-color 300ms ease-in-out;
	}
	.body::-webkit-scrollbar-thumb:hover {
		background-color: var(--scrollbar-color-hover);
	}

	.body::-webkit-scrollbar-track {
		background-color: var(--accent);
	}
</style>
