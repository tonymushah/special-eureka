<script lang="ts">
	import type { ContentRating } from "@mangadex/gql/graphql";
	import { ArrowLeftIcon, ArrowRightIcon } from "svelte-feather-icons";
	import type { Readable } from "svelte/store";
	import type { SwiperContainer } from "swiper/element";
	import MangaPopularElement from "../../manga/popular/MangaPopulatElementWithReadableCoverImage.svelte";
	import ButtonAccent from "../../theme/buttons/ButtonAccent.svelte";
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
	export let popular_titles: PopularTitles[];
	$: current_page = (current_page_ ?? 0) + 1;
</script>

<div class="result">
	<swiper-container bind:this={swiper_container}>
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
