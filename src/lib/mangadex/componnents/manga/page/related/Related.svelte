<script lang="ts">
	import { CoverImageQuality, type MangaRelation } from "@mangadex/gql/graphql";
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/+layout.svelte";
	import { onMount, type ComponentProps } from "svelte";
	import CategorizedTitles from "./CategorizedTitles.svelte";
	import { getContextClient } from "@urql/svelte";
	import getRelatedTitlesDataQuery from "./utils/query";
	import { getRelatedTitlesStoreContext, type RelatedTitle } from "./utils/relatedTitleStore";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import loadash from "lodash";

	const client = getContextClient();
	const store = getRelatedTitlesStoreContext();
	const titles = getTitleLayoutData().queryResult?.relationships.manga;
	const relatedTitles = new Map<MangaRelation, string[]>();
	let categories: ComponentProps<CategorizedTitles>[] = [];
	let isLoading = false;
	let error: Error | undefined;
	async function fetch() {
		const ids = titles?.map<string>((t) => t.id);
		if (ids) {
			if (ids.length != 0) {
				isLoading = true;
				const res = await client
					.query(getRelatedTitlesDataQuery, {
						ids
					})
					.toPromise()
					.finally(() => (isLoading = false));
				if (res.error) {
					error = res.error;
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
					title:
						get_value_from_title_and_random_if_undefined(t.attributes.title, "en") ??
						"",
					status: t.attributes.status,
					description:
						get_value_from_title_and_random_if_undefined(
							t.attributes.description,
							"en"
						) ?? ""
				}));
				if (ts) store.addTitles(ts);
			}
		}
	}
	onMount(async () => {
		titles?.forEach(({ id, related }) => {
			const ids = relatedTitles.get(related);
			if (ids) {
				relatedTitles.set(related, [...ids, id]);
			} else {
				relatedTitles.set(related, [id]);
			}
		});
		try {
			await fetch();
		} catch (err) {
			error = new Error("Unknown Error", {
				cause: err
			});
		}
	});
	$: {
		const data = $store;
		let res: ComponentProps<CategorizedTitles>[] = [];
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
							status
						})
					)
				});
			}
		});
		if (res.length > 0) {
			categories = res;
		}
	}
</script>

<div class="related">
	{#if error}
		<div class="error">
			<h4>{error.name}</h4>
			<p>{error.message}</p>
		</div>
	{/if}
	{#each categories as category}
		<CategorizedTitles title={category.title} titles={category.titles} />
	{:else}
		<div class="404-not-found">Nothing was found... I guess</div>
	{/each}
</div>
