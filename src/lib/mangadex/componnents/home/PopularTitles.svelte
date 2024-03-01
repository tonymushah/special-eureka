<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { getContextClient, queryStore, type OperationResult } from "@urql/svelte";
	import MangaPopularElement from "../manga/popular/MangaPopulatElementWithReadableCoverImage.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import type { SwiperContainer } from "swiper/element";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { ArrowLeftIcon, ArrowRightIcon, RefreshCwIcon } from "svelte-feather-icons";
	import { CoverImageQuality, type HomePopularTitleQuery } from "@mangadex/gql/graphql";
	import { derived, writable } from "svelte/store";
	import { onMount } from "svelte";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import TopTitle from "./utils/TopTitle.svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import Content from "./popular-titles/Content.svelte";
	const client = getContextClient();
	let swiper_container: SwiperContainer | undefined = undefined;
	let current_page_: number | undefined = undefined;
	$: {
		if (swiper_container) {
			current_page_ = swiper_container.swiper.activeIndex;
			swiper_container.swiper.on("slideChange", (s) => {
				current_page_ = s.activeIndex;
			});
		}
	}
	$: current_page = (current_page_ ?? 0) + 1;
	function get_cover_art(cover_id: string, manga_id: string, filename: string) {
		const store = queryStore({
			client,
			query: graphql(`
				query coverImage(
					$cover_id: UUID!
					$manga_id: UUID!
					$filename: String!
					$mode: CoverImageQuality!
				) {
					cover {
						getImage(
							coverId: $cover_id
							mangaId: $manga_id
							filename: $filename
							mode: $mode
						)
					}
				}
			`),
			variables: {
				cover_id,
				manga_id,
				filename,
				mode: CoverImageQuality.V512
			}
		});
		return derived(store, ($s) => {
			const buf: Int8Array | undefined = $s.data?.cover.getImage;
			if (buf) {
				const data = btoa(buf.reduce((data, byte) => data + String.fromCharCode(byte), ""));
				return `data:image/*;base64,${data}`;
			} else {
				return undefined;
			}
		});
	}
	const query = graphql(`
		query homePopularTitle {
			home {
				popularTitles {
					data {
						id
						attributes {
							title
							tags {
								id
								attributes {
									name
								}
							}
							contentRating
							description
						}
						relationships {
							authorArtists {
								id
								attributes {
									name
								}
							}
							coverArt {
								id
								attributes {
									fileName
								}
							}
						}
					}
				}
			}
		}
	`);
	const popular_titles_query = specialQueryStore({
		client,
		query,
		variable: {}
	});
	const _isFetching = popular_titles_query.isFetching;

	onMount(async () => {
		await popular_titles_query.execute();
	});
	$: fetching = $_isFetching;
	$: error = $popular_titles_query?.error;
	$: popular_titles = $popular_titles_query?.data?.home.popularTitles.data.map((manga) => ({
		id: manga.id,
		title: manga.attributes.title["en"] ?? "",
		description: manga.attributes.description["en"] ?? "",
		coverImage: get_cover_art(
			manga.relationships.coverArt.id,
			manga.id,
			manga.relationships.coverArt.attributes.fileName
		),
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
	}));
</script>

<TopTitle
	label="Popular Title"
	bind:fetching
	on:refresh={async () => {
		if (!fetching) {
			await popular_titles_query.execute();
		}
	}}
/>

{#if popular_titles}
	<Content {popular_titles} />
{:else if error}
	<HomeErrorComponnent {error} />
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}

<style lang="scss">
	:root {
		--popular-element-layout-margin: 0em 0em 0em 0em;
		--popular-element-layout-padding: 3em 0em 0em 0em;
	}
</style>
