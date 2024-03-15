<script lang="ts">
	import { writable, type Readable } from "svelte/store";
	import { setTopCoverAltContextStore, setTopCoverContextStore } from "./context";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { MangaStatus } from "@mangadex/gql/graphql";
	import TopInfoLayout from "./TopInfoLayout.svelte";
	import TopInfoCover from "./TopInfoCover.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import type { Author } from "./index";
	import TopInfoAuthors from "./TopInfoAuthors.svelte";
	export let id: string;
	export let title: string;
	export let altTitle: string | undefined = undefined;
	export let coverImage: Readable<string | undefined>;
	export let coverImageAlt: string;
	export let authors: Author[];
	export let tags: Tag[];
	export let status: MangaStatus;
	export let year: number | undefined = undefined;
	export let description: string | undefined = undefined;

	setTopCoverContextStore(coverImage);
	setTopCoverAltContextStore(coverImageAlt);
</script>

<TopInfoLayout>
	<div class="cover-image" slot="cover">
		<TopInfoCover />
	</div>
	<svelte:fragment>
		<h1>{title}</h1>
		{#if altTitle}
			<h2>{altTitle}</h2>
		{/if}
		<TopInfoAuthors {authors} />
	</svelte:fragment>
</TopInfoLayout>
