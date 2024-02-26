<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { getContextClient, queryStore } from "@urql/svelte";
	import MangaPopularElement from "../manga/popular/MangaPopulatElementWithReadableCoverImage.svelte";
	import Title from "../theme/texts/title/Title.svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import Spinner from "../theme/loader/Spinner.svelte";
	import type { SwiperContainer } from "swiper/element";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import { derived } from "svelte/store";
	const client = getContextClient();
	let swiper_container: SwiperContainer | undefined = undefined;
	let current_page: number | undefined = undefined;
	$: {
		if (swiper_container) {
			swiper_container.swiper.on("slideChange", (s) => {
				current_page = s.activeIndex;
			});
		}
	}
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
	const popular_titles_query = queryStore({
		client,
		query: graphql(`
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
		`)
	});

	$: popular_titles = $popular_titles_query.data?.home.popularTitles.data.map((manga) => ({
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
		authors: manga.relationships.authorArtists.map((author_artist) => ({
			id: author_artist.id,
			name: author_artist.attributes.name
		}))
	}));
	$: error = $popular_titles_query.error;
	$: fetching = $popular_titles_query.fetching;
</script>

<Title>Popular Titles</Title>

{#if popular_titles}
	<div class="result">
		<swiper-container bind:this={swiper_container}>
			{#each popular_titles as { coverImage, coverImageAlt, title, tags, contentRating, authors, description }}
				<swiper-slide>
					<MangaPopularElement
						{coverImage}
						{coverImageAlt}
						{tags}
						{title}
						{contentRating}
						{authors}
						{description}
					/>
				</swiper-slide>
			{/each}
		</swiper-container>
		<div class="pagination">
			<ButtonAccent
				isBase={false}
				on:click={() => {
					swiper_container?.swiper.slidePrev();
				}}
			>
				<ArrowLeftIcon />
			</ButtonAccent>
			<ButtonAccent>{current_page}</ButtonAccent>
			<ButtonAccent
				isBase={false}
				on:click={() => {
					swiper_container?.swiper.slideNext();
				}}
			>
				<ArrowRightIcon />
			</ButtonAccent>
		</div>
	</div>
{:else if $popular_titles_query.fetching}
	<div class="loader">
		<Spinner />
	</div>
{:else if error}
	<div class="error">
		<h3>Oops! Something happens when loading the popular titles</h3>
		{#each error.graphQLErrors as { name, message }}
			<div>
				<h4>{name}</h4>
				<p>{message}</p>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	div.loader {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 20em;
	}
	div.error {
		h3 {
			margin: 0em;
		}
		div {
			display: flex;
			align-items: center;
			justify-self: center;
			gap: 10px;
		}
		background-color: color-mix(in srgb, var(--danger-l1) 50%, var(--main-background) 0%);
		border-left: 10px;
		border-radius: 0.25rem;
		border-color: var(--danger-l2);
		color: var(--text-color);
		padding: 1em;
	}
	div.result {
		div.pagination {
			display: flex;
			gap: 1em;
		}
	}
</style>
