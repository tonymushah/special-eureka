<script lang="ts">
	import PrimarySpan from "@mangadex/componnents/theme/texts/span/PrimarySpan.svelte";

	export let index: number = -1;
</script>

{#if index == 0}
	<PrimarySpan>No.1</PrimarySpan>
{:else if index > 0}
	<span>No.{index}</span>
{/if}
