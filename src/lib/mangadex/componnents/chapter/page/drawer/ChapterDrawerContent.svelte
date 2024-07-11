<script lang="ts">
	import Header from "./content/Header.svelte";

	export let left = false;
</script>

<div class="content">
	<Header bind:left />
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
	}
</style>
