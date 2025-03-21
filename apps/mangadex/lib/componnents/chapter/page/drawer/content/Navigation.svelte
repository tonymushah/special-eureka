<script lang="ts">
	import ChaptersNavigation from "./navigation/ChaptersNavigation.svelte";
	import CurrentPage from "./navigation/CurrentPage.svelte";
	import ReportChapter from "./navigation/ReportChapter.svelte";
</script>

<section>
	<CurrentPage />
	<ChaptersNavigation />
	<ReportChapter />
</section>

<style lang="scss">
	section {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
