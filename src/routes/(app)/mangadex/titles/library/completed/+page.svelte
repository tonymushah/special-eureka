<script lang="ts">
	import LibContent from "@mangadex/componnents/library/LibContent.svelte";
	import executeSearchQuery from "./search";
</script>

<div class="layout">
	<LibContent section="completed" {executeSearchQuery} />
</div>

<style lang="scss">
	.layout {
		padding: 4px;
	}
</style>
