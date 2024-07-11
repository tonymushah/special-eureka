<script lang="ts">
	import Header from "./content/Header.svelte";
	import Line from "./content/Line.svelte";
	import TopInfo from "./content/TopInfo.svelte";

	export let left = false;
</script>

<div class="content">
	<Header bind:left />
	<TopInfo />
	<Line />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
</style>
