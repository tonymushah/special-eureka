<script lang="ts">
	import { allowSync } from "@mangadex/stores/chapter/page/allowSync.svelte";
	import { RiWindow2Fill } from "svelte-remixicon";

	let allow = $derived(allowSync.allow);
	const size = "16px";
</script>

{#if allow}
	<RiWindow2Fill {size} />
{/if}
