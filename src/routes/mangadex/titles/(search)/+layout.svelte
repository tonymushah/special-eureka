<script lang="ts">
	import { initMangaSearchAuthorSearchFetcher } from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist";
	import gqlAuthorFetcher from "@mangadex/componnents/manga/search/form/filter/contexts/authorArtist/gql";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();

	initMangaSearchAuthorSearchFetcher(gqlAuthorFetcher);
</script>

<svelte:boundary>
	<div>
		{@render children?.()}
	</div>
</svelte:boundary>

<style lang="scss">
	div {
		--layout-margin-x: 1.25em;
		--layout-margin-y: 0.5em;
		margin-left: var(--layout-margin-x);
		margin-right: var(--layout-margin-x);
		margin-top: var(--layout-margin-y);
		margin-bottom: var(--layout-margin-y);
	}
</style>
