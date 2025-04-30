<script lang="ts">
	import { graphql } from "@mangadex/gql/exports";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import Content from "./popular-titles/Content.svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { popular_title_query } from "./popular-titles";

	const client = getContextClient();

	const popular_titles_query = specialQueryStore({
		client,
		query: popular_title_query,
		variable: {}
	});
	const _isFetching = popular_titles_query.isFetching;

	onMount(async () => {
		await popular_titles_query.execute();
	});
	let fetching = $derived($_isFetching);

	let error = $derived($popular_titles_query?.error);
	let popular_titles = $derived(
		$popular_titles_query?.data?.home.popularTitles.data.map((manga) => ({
			id: manga.id,
			title: get_value_from_title_and_random_if_undefined(manga.attributes.title, "en") ?? "",
			description:
				get_value_from_title_and_random_if_undefined(manga.attributes.description, "en") ??
				"",
			coverImage: get_cover_art({
				client,
				manga_id: manga.id,
				cover_id: manga.relationships.coverArt.id,
				filename: manga.relationships.coverArt.attributes.fileName,
				mode: CoverImageQuality.V512
			}),
			coverImageAlt: manga.attributes.title["en"] ?? manga.relationships.coverArt.id,
			contentRating: manga.attributes.contentRating ?? undefined,
			tags: manga.attributes.tags.map<Tag>((tag) => ({
				id: tag.id,
				name: tag.attributes.name["en"] ?? ""
			})),
			authors: manga.relationships.authorArtists.map<{ id: string; name: string }>(
				(author_artist) => ({
					id: author_artist.id,
					name: author_artist.attributes.name
				})
			)
		}))
	);
</script>

<TopTitle
	label="Popular Title"
	{fetching}
	onrefresh={async () => {
		if (!fetching) {
			await popular_titles_query.execute();
		}
	}}
/>

{#if popular_titles}
	<Content {popular_titles} />
{:else if error}
	<HomeErrorComponnent
		label={"Oops! Something happens when loading the popular titles"}
		{error}
	/>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
