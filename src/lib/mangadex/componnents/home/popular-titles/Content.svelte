<script lang="ts">
	import type { ContentRating } from "@mangadex/gql/graphql";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import type { Readable } from "svelte/store";
	import type { SwiperContainer } from "swiper/element";
	import MangaPopularElement from "../../manga/popular/MangaPopulatElementWithReadableCoverImage.svelte";
	import ButtonAccent from "../../theme/buttons/ButtonAccent.svelte";
	import openTitle from "@mangadex/utils/links/title/[id]";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { onMount } from "svelte";
	import type { SwiperOptions } from "swiper/types";
	import { random } from "lodash";

	let swiper_container: SwiperContainer | undefined = $state(undefined);
	let current_page_: number | undefined = $state(undefined);

	onMount(() => {
		// swiper parameters
		const swiperParams: SwiperOptions = {
			initialSlide: random(0, 9, false),
			slidesPerView: 1,
			autoplay: {
				pauseOnMouseEnter: true,
				delay: 5000
			},
			on: {
				init() {
					if (swiper_container != undefined) {
						if (swiper_container.swiper != undefined) {
							current_page_ = swiper_container.swiper.activeIndex;
						}
					}
				},
				slideChange(swiper) {
					current_page_ = swiper.activeIndex;
				}
			}
		};

		if (swiper_container) {
			// now we need to assign all parameters to Swiper element
			Object.assign(swiper_container, swiperParams);

			// and now initialize it
			swiper_container.initialize();
		}
	});

	type PopularTitles = {
		id: string;
		title: string;
		description: string;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
		contentRating: ContentRating | undefined;
		tags: {
			id: string;
			name: string;
		}[];
		authors: {
			id: string;
			name: string;
		}[];
	};
	interface Props {
		popular_titles: PopularTitles[];
	}

	let { popular_titles }: Props = $props();
	let current_page = $derived((current_page_ ?? 0) + 1);
</script>

<div class="result">
	<swiper-container bind:this={swiper_container} init="false">
		{#each popular_titles as { coverImage, coverImageAlt, title, tags, contentRating, authors, description, id }, index (id)}
			<swiper-slide>
				<MangaPopularElement
					{index}
					{coverImage}
					{coverImageAlt}
					{tags}
					{title}
					{contentRating}
					{authors}
					onclick={() => {
						openTitle(id);
					}}
					onauthorClick={(detail) => {
						goto(
							route("/mangadex/author/[id]", {
								id: detail.id
							})
						);
					}}
					ontagClick={(detail) => {
						goto(
							route("/mangadex/tag/[id]", {
								id: detail.id
							})
						);
					}}
					{description}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
	<div class="pagination">
		<ButtonAccent
			isBase={false}
			onclick={() => {
				if (swiper_container != undefined) {
					swiper_container.swiper.slidePrev();
				}
			}}
		>
			<ArrowLeftIcon />
		</ButtonAccent>
		<ButtonAccent
			onclick={() => {
				if (current_page_) {
					const title = popular_titles[current_page_];
					if (title != undefined) {
						goto(
							route("/mangadex/title/[id]", {
								id: title.id
							})
						);
					}
				}
			}}>{current_page}</ButtonAccent
		>
		<ButtonAccent
			isBase={false}
			onclick={() => {
				if (swiper_container != undefined) {
					swiper_container.swiper.slideNext();
				}
			}}
		>
			<ArrowRightIcon />
		</ButtonAccent>
	</div>
</div>

<style lang="scss">
	:root {
		--popular-element-layout-margin: 0em 0em 0em 0em;
		--popular-element-layout-padding: 3em 0em 0em 0em;
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
