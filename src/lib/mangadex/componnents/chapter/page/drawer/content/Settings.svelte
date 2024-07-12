<script lang="ts">
	import ReadingDirection from "./settings/ReadingDirection.svelte";
	import ResetZoom from "./settings/ResetZoom.svelte";
</script>

<section>
	<ResetZoom />
	<ReadingDirection />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
