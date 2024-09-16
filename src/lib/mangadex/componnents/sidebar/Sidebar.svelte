<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import SidebarHeader from "./SidebarHeader.svelte";
	import SidebarBody from "./SidebarBody.svelte";
	import SidebarFooter from "./SidebarFooter.svelte";
	import isDefaultDecoration from "$lib/window-decoration/stores/isDefaultDecoration";
	import { showSidebar } from "./states/showSidebar";
	import { isSidebarFloating } from "./states/isSidebarFloating";
	import { isSidebarRtl } from "./states/isRtl";
</script>

<div
	class="sidebar"
	class:rtl={$isSidebarRtl}
	class:show={$showSidebar}
	class:float={$isSidebarFloating}
>
	<aside class:collapsed={$isOpen} class:defaultDecoration={$isDefaultDecoration}>
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
	.sidebar {
		display: none;
	}
	.sidebar.show {
		display: contents;
	}
	.sidebar.show.float {
		display: flex;
		position: absolute;
		top: 0;
		z-index: 10;
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
			width ease-in-out 300ms,
			translate ease-in-out 300ms;
		background-color: var(--accent-l1);
		height: -webkit-fill-available;
		width: 256px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 8px;
	}
	aside.defaultDecoration {
		height: 99vh;
	}
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
