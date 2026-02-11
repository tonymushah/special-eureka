<script lang="ts">
	import MangaElementBase5 from "@mangadex/componnents/manga/base/MangaElementBase5.svelte";
	import type { StaffPicksTitle } from ".";
	import type { SwiperContainer } from "swiper/element";
	import openTitle from "@mangadex/utils/links/title/[id]";
	import type { SwiperOptions } from "swiper/types";
	import { readManga } from "@mangadex/componnents/manga/read/ReadDialog.svelte";
	import NothingToShow from "../NothingToShow.svelte";

	interface Props {
		mangas: StaffPicksTitle[];
	}

	let { mangas = $bindable() }: Props = $props();
	let swiper_container: SwiperContainer | undefined = $state(undefined);
	// swiper parameters
	const swiperParams: SwiperOptions = {
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
			},
			1500: {
				slidesPerView: 5
			},
			1920: {
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
	$effect(() => {
		if (swiper_container) {
			// now we need to assign all parameters to Swiper element
			Object.assign(swiper_container, swiperParams);

			// and now initialize it
			swiper_container.initialize();
		}
	});
</script>

{#if mangas.length > 0}
	<div class="result">
		<swiper-container bind:this={swiper_container} init="false">
			{#each mangas as { id, coverImageAlt, title, description } (id)}
				<swiper-slide>
					<MangaElementBase5
						{coverImageAlt}
						{title}
						{description}
						onmoreInfoClick={() => {
							openTitle(id);
						}}
						onreadClick={() => {
							readManga(id);
						}}
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
	</style>
{:else}
	<NothingToShow />
{/if}
