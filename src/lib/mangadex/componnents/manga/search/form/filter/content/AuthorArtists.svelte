<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import {
		getMangaSearchArtistsOptionsWritable,
		getMangaSearchAuthorsOptionsWritable
	} from "../contexts/authorArtist";
	import AuthorsSearchSelect from "./authors/AuthorsSearchSelect.svelte";
	const authors = getMangaSearchAuthorsOptionsWritable();
	const artists = getMangaSearchArtistsOptionsWritable();
</script>

<section class="author">
	<Title type={3}>Authors</Title>
	<AuthorsSearchSelect store={authors} />
</section>

<section class="artists">
	<Title type={3}>Artists</Title>
	<AuthorsSearchSelect store={artists} />
</section>
