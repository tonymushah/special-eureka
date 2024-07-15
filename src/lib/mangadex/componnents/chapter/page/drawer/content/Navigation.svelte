<script lang="ts">
	import ChaptersNavigation from "./navigation/ChaptersNavigation.svelte";
	import CurrentPage from "./navigation/CurrentPage.svelte";
</script>

<section>
	<CurrentPage />
	<ChaptersNavigation />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
	}
</style>
