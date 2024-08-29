<script lang="ts">
	import ContentRating from "./content/ContentRating.svelte";
	import Languages from "./content/Languages.svelte";
	import PublicationDemographic from "./content/PublicationDemographic.svelte";
	import PublicationStatus from "./content/PublicationStatus.svelte";
	import Tags from "./content/Tags.svelte";
	import Year from "./content/Year.svelte";
</script>

<article>
	<div class="top">
		<ContentRating />

		<PublicationDemographic />

		<PublicationStatus />

		<Year />
	</div>

	<div class="tags">
		<Tags />
	</div>

	<div class="languages">
		<Languages />
	</div>
</article>

<style lang="scss">
	.top {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5px;
	}
	.tags {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5px;
	}
</style>
