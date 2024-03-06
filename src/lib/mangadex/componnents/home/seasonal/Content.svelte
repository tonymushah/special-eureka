<script lang="ts">
	import MangaElementBase3 from "@mangadex/componnents/manga/base/base3/MangaElementBase3WithReadableCoverImage.svelte";
	import { CoverImageQuality, type SeasonalQuery } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import type { SwiperContainer } from "swiper/element";

	const client = getContextClient();
	export let data: SeasonalQuery;
	type SeasonalTitle = {
		id: string;
		title: string;
		coverImage: Readable<string | undefined>;
		coverImageAlt: string;
	};
	function getLangData(title: Record<string, string>): string {
		return get_value_from_title_and_random_if_undefined(title, "en") ?? "";
	}
	$: seasonal = data.home.seasonal.relationships.titles.map<SeasonalTitle>((t) => ({
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
	}));

	let swiper_container: SwiperContainer | undefined = undefined;
	onMount(() => {
		// swiper parameters
		const swiperParams = {
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
		{#each seasonal as { id, title, coverImage, coverImageAlt } (id)}
			<swiper-slide>
				<MangaElementBase3 {title} {coverImage} {coverImageAlt} />
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style lang="scss">
	.result {
		margin: 1em;
	}
</style>
