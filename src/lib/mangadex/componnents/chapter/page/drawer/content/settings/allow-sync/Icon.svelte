<script lang="ts">
	import { allowSync } from "@mangadex/stores/chapter/page/allowSync.svelte";
	import { AppWindow } from "@lucide/svelte";

	let allow = $derived(allowSync.allow);
	const size = "16px";
</script>

{#if allow}
	<AppWindow {size} />
{/if}
