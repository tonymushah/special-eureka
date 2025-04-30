<script>
	import Menu from "../base/Menu.svelte";
	import ServerIconState from "./ServerIconState.svelte";
</script>

<Menu label="Offline Server">
	{#snippet icon()}
		<ServerIconState />
	{/snippet}
</Menu>
