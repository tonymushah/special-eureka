<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import tagTopTenQuery from "@mangadex/gql-docs/tag/page/topTen";
	import { client } from "@mangadex/gql/urql";
	import { createQuery } from "@tanstack/svelte-query";
	import TopTenElement from "./TopTenElement.svelte";
	import manga_title_to_lang_map from "@mangadex/utils/lang/record-to-map/manga-title-to-lang-map";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import { debounce } from "lodash";

	interface Props {
		id: string;
	}
	let { id }: Props = $props();

	let topTen = createQuery(() => ({
		queryKey: ["tag-page", id, "top-ten"],
		async queryFn() {
			const res = await client
				.query(tagTopTenQuery, {
					id
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data) {
				return res.data.tag.page.topTen;
			} else {
				throw new Error("no data??");
			}
		}
	}));

	$effect(() =>
		defaultContentProfile.subscribe(
			debounce(() => {
				topTen.refetch();
			})
		)
	);
</script>

<section>
	<h3>Somewhat relevant this week <i>idk...</i></h3>

	{#if topTen.data}
		<swiper-container
			slides-per-view={2}
			space-between={10}
			loop="true"
			autoplay={{
				pauseOnMouseEnter: true,
				delay: 5000
			}}
			mousewheel
		>
			{#each topTen.data as title}
				{@const _title = manga_title_to_lang_map(title.attributes.title)}
				<TopTenElement
					mangaId={title.id}
					coverId={title.relationships.coverArt.id}
					filename={title.relationships.coverArt.attributes.fileName}
					originalLanguage={title.attributes.originalLanguage}
					tags={title.attributes.tags.map((tag) => ({
						id: tag.id,
						name: manga_title_to_lang_map(tag.attributes.name)
					}))}
					title={_title}
					cttRating={title.attributes.contentRating ?? undefined}
				/>
			{/each}
		</swiper-container>
	{:else if topTen.isLoading}
		<section class="loading">
			<p>Loading...</p>
		</section>
	{:else if topTen.isError}
		<ErrorComponent
			label="Error on loading treding..."
			error={topTen.error}
			retry={() => {
				topTen.refetch();
			}}
		/>
	{/if}
</section>
