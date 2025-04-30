<!-- [x] use tanstack query for fetching -->
<script lang="ts">
	import { CoverImageQuality, type MangaRelation } from "@mangadex/gql/graphql";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import { onMount, type ComponentProps } from "svelte";
	import CategorizedTitles from "./CategorizedTitles.svelte";
	import { getContextClient } from "@urql/svelte";
	import getRelatedTitlesDataQuery from "./utils/query";
	import { getRelatedTitlesStoreContext, type RelatedTitle } from "./utils/relatedTitleStore";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import loadash from "lodash";
	import { createQuery } from "@tanstack/svelte-query";
	import { get } from "svelte/store";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";

	const client = getContextClient();
	const store = getRelatedTitlesStoreContext();
	const titles = getTitleLayoutData().queryResult?.relationships.manga;
	const manga_id = getTitleLayoutData().layoutData.id;
	const relatedTitles = new Map<MangaRelation, string[]>();
	let categories: ComponentProps<typeof CategorizedTitles>[] = $state([]);
	let error: Error | undefined = $state();
	const query = createQuery({
		queryKey: ["manga", manga_id, "fetch-ids"],
		enabled: false,
		async queryFn() {
			const ids = titles?.map<string>((t) => t.id);
			const res = await client
				.query(getRelatedTitlesDataQuery, {
					ids
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			}
			const ts = res.data?.manga.list.data.map<RelatedTitle>((t) => ({
				id: t.id,
				coverArt: get_cover_art({
					client,
					cover_id: t.relationships.coverArt.id,
					filename: t.relationships.coverArt.attributes.fileName,
					manga_id: t.id,
					mode: CoverImageQuality.V256
				}),
				coverArtAlt: t.relationships.coverArt.id,
				title: get_value_from_title_and_random_if_undefined(t.attributes.title, "en") ?? "",
				status: t.attributes.status,
				description:
					get_value_from_title_and_random_if_undefined(t.attributes.description, "en") ??
					""
			}));
			if (ts) store.addTitles(ts);
			return ts;
		}
	});
	onMount(
		query.subscribe((q) => {
			if (q.error != null) {
				error = q.error;
			}
		})
	);
	onMount(async () => {
		titles?.forEach(({ id, related }) => {
			const ids = relatedTitles.get(related);
			if (ids) {
				relatedTitles.set(related, [...ids, id]);
			} else {
				relatedTitles.set(related, [id]);
			}
		});
		await get(query).refetch();
	});
	$effect(() => {
		const data = $store;
		let res: ComponentProps<typeof CategorizedTitles>[] = [];
		relatedTitles.forEach((v, k) => {
			let title: RelatedTitle[] = [];
			v.forEach((t) => {
				const dt = data.get(t);
				if (dt) title.push(dt);
			});
			if (title.length > 0) {
				res.push({
					title: loadash.camelCase(k),
					titles: title.map(
						({ id, coverArt, coverArtAlt, title, description, status }) => ({
							id,
							coverImage: coverArt,
							coverImageAlt: coverArtAlt,
							title,
							description,
							status,
							mangaId: id
						})
					)
				});
			}
		});
		if (res.length > 0) {
			categories = res;
		}
	});
</script>

<article class="related">
	{#if error}
		<ErrorComponent
			{error}
			label="Error when fetching related titles"
			retry={() => {
				get(query).refetch();
			}}
		/>
	{/if}
	{#each categories as category}
		<CategorizedTitles title={category.title} titles={category.titles} />
	{:else}
		<div class="404-not-found">Nothing was found... I guess</div>
	{/each}
	{#if $query.isFetching}
		<div class="fetching">
			<Fetching />
		</div>
	{/if}
</article>

<style lang="scss">
	.fetching {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
