<script lang="ts">
	import Header from "./content/Header.svelte";
	import Line from "./content/Line.svelte";
	import Navigation from "./content/Navigation.svelte";
	import Settings from "./content/Settings.svelte";
	import TopInfo from "./content/TopInfo.svelte";

	export let left = false;
</script>

<div class="content">
	<Header bind:left />
	<TopInfo />
	<Navigation />
	<Line />
	<Settings />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
