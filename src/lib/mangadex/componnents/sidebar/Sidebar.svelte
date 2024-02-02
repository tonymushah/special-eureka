<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
	import { Box, Button, createStyles, theme, Text } from "@svelteuidev/core";
	import SidebarHeader from "./SidebarHeader.svelte";
</script>

<aside class:sidebar={true} class:collapsed={$isOpen}>
	<SidebarHeader />
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
</style>
