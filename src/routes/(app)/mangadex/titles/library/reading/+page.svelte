<script lang="ts">
	import LibContent from "@mangadex/componnents/library/LibContent.svelte";
	import executeSearchQuery from "./search";
	import AppTitle from "@special-eureka/core/components/AppTitle.svelte";
</script>

<div class="layout">
	<AppTitle title="Reading Library - MangaDex" />
	<LibContent section="reading" {executeSearchQuery} />
</div>

<style lang="scss">
	.layout {
		padding: 4px;
	}
</style>
