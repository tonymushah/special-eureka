<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import { popular_title_query } from "./popular-titles";
	import Content from "./popular-titles/Content.svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";

	const client = getContextClient();

	let popular_titles_query = createQuery(() => ({
		queryKey: ["home", "popular", "titles"],
		async queryFn() {
			const res = await client.query(popular_title_query, {}).toPromise();
			if (res.data) {
				return res.data.home.popularTitles.data;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		}
	}));

	onMount(() => {
		return defaultContentProfile.subscribe(() => {
			popular_titles_query.refetch();
		});
	});
</script>

<div class="title">
	<TopTitle
		label="Popular Title"
		fetching={popular_titles_query.isFetching}
		onrefresh={async () => {
			if (!popular_titles_query.isFetching) {
				await popular_titles_query.refetch();
			}
		}}
	/>
</div>

{#if popular_titles_query.isSuccess}
	<Content
		popular_titles={popular_titles_query.data.map((manga) => ({
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
		}))}
	/>
{:else if popular_titles_query.isError}
	<HomeErrorComponnent
		label={"Oops! Something happens when loading the popular titles"}
		error={popular_titles_query.error}
	/>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}

<style lang="scss">
	.title {
		padding-top: 1em;
	}
</style>
