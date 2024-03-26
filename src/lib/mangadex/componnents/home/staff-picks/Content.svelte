<script lang="ts">
	import MangaElementBase5WithReadableCoverImage from "@mangadex/componnents/manga/base/base5/MangaElementBase5WithReadableCoverImage.svelte";
	import type { StaffPicksTitle } from ".";
	import type { SwiperContainer } from "swiper/element";
	import { onMount } from "svelte";
	import openTitle from "@mangadex/utils/links/title/[id]";

	export let mangas: StaffPicksTitle[];
	let swiper_container: SwiperContainer | undefined = undefined;
	onMount(() => {
		// swiper parameters
		const swiperParams = {
			slidesPerView: 1,
			breakpoints: {
				640: {
					slidesPerView: 2
				},
				1024: {
					slidesPerView: 3
				},
				1360: {
					slidesPerView: 4
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
		{#each mangas as { id, coverImage, coverImageAlt, title, description } (id)}
			<swiper-slide>
				<MangaElementBase5WithReadableCoverImage
					{coverImage}
					{coverImageAlt}
					{title}
					{description}
					on:moreInfoClick={() => {
						openTitle(id);
					}}
				/>
			</swiper-slide>
		{/each}
	</swiper-container>
</div>

<style lang="scss">
	.result {
		margin: 1em;
	}
</style>
