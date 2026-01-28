<script lang="ts">
	import AuthorArtists from "./content/AuthorArtists.svelte";
	import ContentRating from "./content/ContentRating.svelte";
	import Languages from "./content/Languages.svelte";
	import PublicationDemographic from "./content/PublicationDemographic.svelte";
	import PublicationStatus from "./content/PublicationStatus.svelte";
	import TagMode from "./content/TagMode.svelte";
	import Tags from "./content/Tags.svelte";
	import Year from "./content/Year.svelte";
</script>

<article>
	<div class="flexed author-artists">
		<AuthorArtists />
	</div>

	<div class="flexed top">
		<ContentRating />

		<PublicationDemographic />

		<PublicationStatus />

		<Year />
	</div>

	<div class="flexed tags">
		<Tags />
	</div>

	<div class="tag-modes">
		<TagMode />
	</div>

	<div class="flexed languages">
		<Languages />
	</div>
</article>

<style lang="scss">
	.flexed {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5px;
	}
	.tag-modes {
		margin-top: 5px;
		margin-bottom: 5px;
	}
</style>
