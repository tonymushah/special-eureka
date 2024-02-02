<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Button, createStyles, theme, Text } from "@svelteuidev/core";
	import SidebarHeader from "./SidebarHeader.svelte";
	import SidebarBody from "./SidebarBody.svelte";
</script>

<aside class:sidebar={true} class:collapsed={$isOpen}>
	<div class="header">
        <SidebarHeader />
    </div>
    <div class="body">
        <SidebarBody/>
    </div>
    <div class="footer">
        
    </div>
</aside>

<style>
	.sidebar {
		transition: width ease-in-out 300ms;
		background-color: #cccccc;
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
		margin-top: 10px;
		margin-bottom: 10px;
	}
    .body {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
    }
</style>
