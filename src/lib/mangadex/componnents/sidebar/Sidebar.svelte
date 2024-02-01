<script lang="ts">
	import { sidebarState as isOpen } from "@mangadex/stores";
    import { Box, Button, createStyles, theme, Text } from "@svelteuidev/core";

</script>

<div class:sidebar={true} class:collapsed={$isOpen}>
	<Box
		on:click={() => {
			$isOpen = !$isOpen;
		}}
	>
		<Text>Mangadex</Text>
	</Box>
</div>

<style>
	.sidebar {
		transition: width ease-in-out 300ms;
		background-color: #cccccc;
		height: 100vh;
		width: 200px;
        display: inline-block;
	}
	.collapsed {
		width: 80px;
	}
</style>
