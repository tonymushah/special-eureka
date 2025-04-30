<script lang="ts">
	import { CoverImageQuality, type RecentlyAddedHomeQueryQuery } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import type { SwiperContainer } from "swiper/element";
	import MangaElementBase4 from "@mangadex/componnents/manga/base/base4/MangaElementBase4WithReadableCoverImage.svelte";
	import openTitle from "@mangadex/utils/links/title/[id]";
	import type { SwiperOptions } from "swiper/types";

	interface Props {
		data: RecentlyAddedHomeQueryQuery;
	}

	let { data }: Props = $props();
	const client = getContextClient();
	type Title = {
		id: string;
		title: string;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
	};
	function getLangData(title: Record<string, string>): string {
		return get_value_from_title_and_random_if_undefined(title, "en") ?? "";
	}
	let titles = $derived(
		data.home.recentlyAdded.data.map<Title>((t) => ({
			id: t.id,
			title: getLangData(t.attributes.title),
			coverImage: get_cover_art({
				cover_id: t.relationships.coverArt.id,
				manga_id: t.id,
				mode: CoverImageQuality.V256,
				filename: t.relationships.coverArt.attributes.fileName,
				client
			}),
			coverImageAlt: t.relationships.coverArt.id
		}))
	);

	let swiper_container: SwiperContainer | undefined = $state(undefined);
	onMount(() => {
		// swiper parameters
		const swiperParams: SwiperOptions = {
			slidesPerView: "auto",
			breakpoints: {
				640: {
					slidesPerView: 3
				},
				1024: {
					slidesPerView: 5
				},
				1360: {
					slidesPerView: 6
				}
			},
			mousewheel: true,
			freeMode: true,
			on: {
				init() {
					// ...
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
</script>

<div class="result">
	<swiper-container bind:this={swiper_container} init="false">
		{#each titles as { id, title, coverImage, coverImageAlt } (id)}
			<swiper-slide>
				<MangaElementBase4
					onclick={() => {
						openTitle(id);
					}}
					{title}
					{coverImage}
					{coverImageAlt}
					mangaId={id}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style lang="scss">
	.result {
		margin: 1em;
	}
	swiper-slide {
		padding-bottom: 10px;
	}
</style>
