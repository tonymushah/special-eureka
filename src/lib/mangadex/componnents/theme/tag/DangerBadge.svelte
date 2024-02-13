<script lang="ts">
	import Default from "./danger/Default.svelte";
	import L1 from "./danger/L1.svelte";
	import L2 from "./danger/L2.svelte";
	export let type: "default" | "l1" | "l2" = "default";
</script>

{#if type == "l1"}
	<L1>
		<slot />
	</L1>
{:else if type == "l2"}
	<L2>
		<slot />
	</L2>
{:else}
	<Default>
		<slot />
	</Default>
{/if}
