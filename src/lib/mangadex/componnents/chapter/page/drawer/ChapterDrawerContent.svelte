<script lang="ts">
	import Header from "./content/Header.svelte";
	import Line from "./content/Line.svelte";
	import Settings from "./content/Settings.svelte";
	import TopInfo from "./content/TopInfo.svelte";

	export let left = false;
</script>

<div class="content">
	<Header bind:left />
	<TopInfo />
	<Line />
	<Settings />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 3px;
	}
</style>
