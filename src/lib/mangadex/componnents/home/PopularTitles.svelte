<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import { getContextClient, queryStore } from "@urql/svelte";
	import MangaPopularElement from "../manga/popular/MangaPopularElement.svelte";
	import { SvelteComponent } from "svelte";
	import type { Tag } from "@mangadex/utils/types/Tag";
	import Spinner from "../theme/loader/Spinner.svelte";
	import type { SwiperContainer } from "swiper/element";
	import ButtonAccent from "../theme/buttons/ButtonAccent.svelte";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";

	let swiper_container: SwiperContainer | undefined = undefined;
	let current_page: number | undefined = undefined;
	$: {
		if (swiper_container) {
			swiper_container.swiper.on("slideChange", (s) => {
				current_page = s.activeIndex;
			});
		}
	}
	const popular_titles_query = queryStore({
		client: getContextClient(),
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
		coverImage: `mangadex://covers/${manga.relationships.coverArt.id}/${manga.relationships.coverArt.attributes.fileName}?mangaId=${manga.id}&mode=512`,
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
</script>

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
		display: flex;
		align-items: center;
		justify-content: center;
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
		}
	}
</style>
