<script lang="ts">
	import { Box, Button, createStyles, theme, Text } from "@svelteuidev/core";

	let isOpen = true;
	$: width = isOpen ? "200px" : "80px";
</script>

<div class:sidebar={true} class:collapsed={isOpen}>
	<Box
		on:click={() => {
			isOpen = !isOpen;
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
		width: 300px;
	}
	.collapsed {
		width: 80px;
	}
</style>
