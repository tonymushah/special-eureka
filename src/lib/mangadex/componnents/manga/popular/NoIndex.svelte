<script lang="ts">
	import PrimarySpan from "@mangadex/componnents/theme/texts/span/PrimarySpan.svelte";

	export let index: number = -1;
</script>

<div>
	{#if index == 0}
		<PrimarySpan>No.1</PrimarySpan>
	{:else if index > 0}
		<span>No.{index + 1}</span>
	{/if}
</div>

<style lang="scss">
	div {
		margin-left: 1em;
		margin-top: 0.25em;
		font-size: 16px;
		font-weight: 800;
	}
</style>
