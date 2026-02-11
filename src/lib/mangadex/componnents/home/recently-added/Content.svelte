<script lang="ts">
	import { type RecentlyAddedHomeQueryQuery } from "@mangadex/gql/graphql";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { getContextClient } from "@urql/svelte";
	import type { SwiperContainer } from "swiper/element";
	import MangaElementBase4 from "@mangadex/componnents/manga/base/MangaElementBase4.svelte";
	import openTitle from "@mangadex/utils/links/title/[id]";
	import type { SwiperOptions } from "swiper/types";
	import NothingToShow from "../NothingToShow.svelte";

	interface Props {
		data: RecentlyAddedHomeQueryQuery;
	}

	let { data }: Props = $props();
	const client = getContextClient();
	type Title = {
		id: string;
		title: string;
		coverImageAlt: string;
	};
	function getLangData(title: Record<string, string>): string {
		return get_value_from_title_and_random_if_undefined(title, "en") ?? "";
	}
	let titles = $derived(
		data.home.recentlyAdded.data.map<Title>((t) => ({
			id: t.id,
			title: getLangData(t.attributes.title),
			coverImageAlt: t.relationships.coverArt.id
		}))
	);

	let swiper_container: SwiperContainer | undefined = $state(undefined);
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
			},
			1500: {
				slidesPerView: 7
			},
			1920: {
				slidesPerView: 8
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

{#if titles.length > 0}
	<div class="result">
		<swiper-container bind:this={swiper_container} init="false">
			{#each titles as { id, title, coverImageAlt } (id)}
				<swiper-slide>
					<MangaElementBase4
						onclick={() => {
							openTitle(id);
						}}
						{title}
						{coverImageAlt}
						mangaId={id}
					/>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
{:else}
	<NothingToShow />
{/if}

<style lang="scss">
	.result {
		margin: 1em;
	}
	swiper-slide {
		padding-bottom: 10px;
		padding-top: 3px;
	}
</style>
