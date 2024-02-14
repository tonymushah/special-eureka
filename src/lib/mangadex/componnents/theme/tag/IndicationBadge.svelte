<script lang="ts">
	import Blue from "./indication/Blue.svelte";
	export let variant: "blue" = "blue";
</script>

{#if variant == "blue"}
	<Blue>
		<slot />
	</Blue>
{/if}
