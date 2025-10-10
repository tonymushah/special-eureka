<script lang="ts">
	import { allowSync } from "@mangadex/stores/chapter/page/allowSync.svelte";
	import { RefreshCwIcon, RefreshCcwIcon } from "svelte-feather-icons";

	let allow = $derived(allowSync.allow);
	const size = "16";
</script>

{#if allow}
	<RefreshCwIcon {size} />
{:else}
	<RefreshCcwIcon {size} />
{/if}
