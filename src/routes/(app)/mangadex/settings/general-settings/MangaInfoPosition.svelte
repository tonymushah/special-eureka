<script lang="ts">
	import { MangaInfosPositions } from "@mangadex/gql/graphql";
	import { mangaInfoPosition } from "@mangadex/stores/manga-info-position";
</script>

<div>
	<h3>Manga info position:</h3>
	<select bind:value={$mangaInfoPosition}>
		<option value={MangaInfosPositions.Left}>Left</option>
		<option value={MangaInfosPositions.Right}>Right</option>
		<option value={MangaInfosPositions.BeneathDescription}>Beneath Description</option>
	</select>
</div>

<section>
	<p>
		<i>
			You know, that title section with the authors, artists, links, and alt-titles that is always
			on the left side
		</i>, <br />
		This option allows you to move it. <br />
		<i>
			Tony Mushah: I think most people would put it
			<button
				class="beneath-title-description"
				onclick={() => {
					$mangaInfoPosition = MangaInfosPositions.BeneathDescription;
				}}
			>
				beneath the title description
			</button>
			.
		</i>
	</p>
</section>

<style lang="scss">
	div {
		display: flex;
		align-items: center;
		gap: 6px;
		h3 {
			margin: 0px;
		}
	}
	p {
		margin: 0px;
	}
	select {
		border: 3px var(--mid-tone) solid;
		font-family: var(--fonts);
		font-weight: 800;
		padding: 2px;
		border-radius: 3px;
	}
	.beneath-title-description {
		display: inline;
		border: none;
		background-color: inherit;
		color: inherit;
		font-family: inherit;
		font-size: inherit;
		padding: 0px;
		font-style: inherit;
		font-weight: inherit;
	}
	.beneath-title-description:hover {
		text-decoration: underline;
	}
	.beneath-title-description:active {
		text-decoration: wavy;
	}
</style>
