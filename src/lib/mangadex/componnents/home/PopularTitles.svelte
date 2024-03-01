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
		authors: manga.relationships.authorArtists.map((author_artist) => ({
			id: author_artist.id,
			name: author_artist.attributes.name
		}))
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
	<div class="result">
		<swiper-container bind:this={swiper_container}>
			{#each popular_titles as { coverImage, coverImageAlt, title, tags, contentRating, authors, description, id }, index (id)}
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
{:else if error}
	<div class="error with-margin">
		<h3>Oops! Something happens when loading the popular titles</h3>
		{#each error.graphQLErrors as { name, message }}
			<div>
				<h4>{name}</h4>
				<p>{message}</p>
			</div>
		{/each}
	</div>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}

<style lang="scss">
	:root {
		--popular-element-layout-margin: 0em 0em 0em 0em;
		--popular-element-layout-padding: 3em 0em 0em 0em;
	}
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
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
		position: relative;
		top: -3em;
		margin-bottom: -3em;
		div.pagination {
			align-items: end;
			display: flex;
			gap: 1em;
			justify-content: end;
			position: relative;
			top: -2em;
			z-index: 1;
			margin-right: 2em;
		}
	}
</style>
