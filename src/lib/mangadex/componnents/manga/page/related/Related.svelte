<!-- [x] use tanstack query for fetching -->
<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import { CoverImageQuality, type MangaRelation } from "@mangadex/gql/graphql";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import loadash, { startCase } from "lodash";
	import { onMount, type ComponentProps } from "svelte";
	import CategorizedTitles from "./CategorizedTitles.svelte";
	import getRelatedTitlesDataQuery from "./utils/query";
	import { getRelatedTitlesStoreContext, type RelatedTitle } from "./utils/relatedTitleStore";

	const client = getContextClient();
	const store = getRelatedTitlesStoreContext();
	const titles = getTitleLayoutData().queryResult?.relationships.manga;
	const manga_id = getTitleLayoutData().layoutData.id;
	const relatedTitles = new Map<MangaRelation, string[]>();
	let categories: ComponentProps<typeof CategorizedTitles>[] = $state([]);

	let query = createQuery(() => ({
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
	}));
	let error: Error | undefined = $derived.by(() => {
		if (query.error != null) {
			return query.error;
		}
	});
	onMount(async () => {
		titles?.forEach(({ id, related }) => {
			const ids = relatedTitles.get(related);
			if (ids) {
				relatedTitles.set(related, [...ids, id]);
			} else {
				relatedTitles.set(related, [id]);
			}
		});
		await query.refetch();
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
				query.refetch();
			}}
		/>
	{/if}
	{#each categories as category}
		<CategorizedTitles
			title={startCase(category.title)}
			titles={category.titles}
			ontitles={({ id }) => {
				goto(
					route("/mangadex/title/[id]", {
						id
					})
				);
			}}
		/>
	{:else}
		<div class="404-not-found">Nothing was found... I guess</div>
	{/each}
	{#if query.isFetching}
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
