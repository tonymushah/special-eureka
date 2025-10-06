<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import MangaElementBase4WithReadableCoverImage from "@mangadex/componnents/manga/base/base4/MangaElementBase4WithReadableCoverImage.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import tagRecentlyAddedQuery from "@mangadex/gql-docs/tag/page/recentlyAdded";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onMount } from "svelte";
	import type { SwiperContainer } from "swiper/element";
	import type { SwiperOptions } from "swiper/types";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();
	let swiper_container: SwiperContainer | undefined = $state(undefined);
	$effect(() => {
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
			return () => {};
		}
	});

	const client = getContextClient();
	let query = createQuery(() => ({
		queryKey: ["tag", id, "recently-added", "titles"],
		async queryFn() {
			const res = await client
				.query(tagRecentlyAddedQuery, {
					id
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.tag.page.recentlyAdded;
			} else {
				throw new Error("No data??");
			}
		},
		networkMode: "online"
	}));
	$effect(() =>
		defaultContentProfile.subscribe(
			debounce(() => {
				query.refetch();
			})
		)
	);
</script>

<section>
	<h3>Recently Added</h3>
	{#if query.isLoading}
		<div class="loading">
			<h4>
				LoAdInG...
				{#if query.isPaused}
					<i>(paused)</i>
				{/if}
			</h4>
		</div>
	{:else if query.isSuccess}
		<swiper-container bind:this={swiper_container} init="false">
			{#each query.data as title (title.id)}
				<swiper-slide>
					<MangaElementBase4WithReadableCoverImage
						title={get_value_from_title_and_random_if_undefined(
							title.attributes.title,
							"en"
						) ?? ""}
						coverImage={get_cover_art({
							cover_id: title.relationships.coverArt.id,
							manga_id: title.id,
							mode: CoverImageQuality.V256,
							filename: title.relationships.coverArt.attributes.fileName,
							client
						})}
						coverImageAlt={title.relationships.coverArt.attributes.description}
						mangaId={title.id}
					/>
				</swiper-slide>
			{/each}
		</swiper-container>
	{:else if query.isError}
		<ErrorComponent
			label={`Cannot fetch ${id} recently added`}
			error={query.error}
			retry={() => {
				query.refetch();
			}}
		/>
	{/if}
</section>

<style lang="scss">
	.loading {
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--mid-tone);
		border: 2px dashed var(--mid-tone);
		border-radius: 1em;
		width: 50%;
		margin: 0px 25%;
		height: 7em;
	}
	swiper-slide {
		margin-top: 10px;
	}
</style>
