<script lang="ts">
	import Header from "./content/Header.svelte";
	import Line from "./content/Line.svelte";

	export let left = false;
</script>

<div class="content">
	<Header bind:left />
	<Line />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
</style>
