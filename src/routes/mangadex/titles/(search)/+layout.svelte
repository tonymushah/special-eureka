<script lang="ts">
	import { initMangaSearchAuthorSearchFetcher } from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist";
	import gqlAuthorFetcher from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist/gql";

	initMangaSearchAuthorSearchFetcher(gqlAuthorFetcher);
</script>

<slot />
