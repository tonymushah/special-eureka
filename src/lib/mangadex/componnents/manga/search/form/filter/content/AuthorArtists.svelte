<script lang="ts">
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import {
		getMangaSearchArtistsOptionsWritable,
		getMangaSearchAuthorsOptionsWritable
	} from "../contexts/authorArtist";
	import AuthorsSearchSelect from "./authors/AuthorsSearchSelect.svelte";
	import type { PortalConfig } from "@melt-ui/svelte/internal/actions";
	const authors = getMangaSearchAuthorsOptionsWritable();
	const artists = getMangaSearchArtistsOptionsWritable();
	interface Props {
		portal?: PortalConfig;
	}
	let { portal }: Props = $props();
</script>

<section class="author">
	<Title type={3}>Authors</Title>
	<AuthorsSearchSelect store={authors} {portal} />
</section>

<section class="artists">
	<Title type={3}>Artists</Title>
	<AuthorsSearchSelect store={artists} {portal} />
</section>
