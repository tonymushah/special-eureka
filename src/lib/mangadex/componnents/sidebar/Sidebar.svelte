<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Button, createStyles, theme, Text } from "@svelteuidev/core";
	import SidebarHeader from "./SidebarHeader.svelte";
	import SidebarBody from "./SidebarBody.svelte";
	import SidebarFooter from "./SidebarFooter.svelte";
</script>

<aside class:sidebar={true} class:collapsed={$isOpen}>
	<div class="header">
        <SidebarHeader />
    </div>
    <div class="body">
        <SidebarBody/>
    </div>
    <div class="footer">
        <SidebarFooter/>
    </div>
</aside>

<style>
	.sidebar {
		transition: width ease-in-out 300ms;
		background-color: var(--accent-l1);
		height: 100vh;
		width: 256px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 8px;
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
</style>
