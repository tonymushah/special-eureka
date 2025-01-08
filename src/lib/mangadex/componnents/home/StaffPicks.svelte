<!-- @migration-task Error while migrating Svelte code: can't migrate `$: error = $query_store?.error;` to `$derived` because there's a variable named derived.
     Rename the variable and try again or migrate by hand. -->
<script lang="ts">
	import TopTitle from "./utils/TopTitle.svelte";
	import query from "./staff-picks/query";
	import { getContextClient } from "@urql/svelte";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { onMount } from "svelte";
	import type { StaffPicksTitle } from "./staff-picks";
	import { derived } from "svelte/store";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { CoverImageQuality } from "@mangadex/gql/graphql";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import Content from "./staff-picks/Content.svelte";
	const client = getContextClient();
	const query_store = specialQueryStore({
		client,
		query,
		variable: {}
	});
	const data_store = derived(query_store, ($store) => {
		const id: string = $store?.data?.home.staffPicks.id;
		const mangas =
			$query_store?.data?.home.staffPicks.relationships.titles.map<StaffPicksTitle>((t) => {
				const manga_id: string = t.id;
				const cover_id: string = t.relationships.coverArt.id;
				const filename: string = t.relationships.coverArt.attributes.fileName;
				const coverImage = get_cover_art({
					client,
					cover_id,
					filename,
					manga_id,
					mode: CoverImageQuality.V256
				});
				const title =
					get_value_from_title_and_random_if_undefined(t.attributes.title, "en") ?? "";
				const description =
					get_value_from_title_and_random_if_undefined(t.attributes.description, "en") ??
					"";
				return {
					id: manga_id,
					coverImage,
					coverImageAlt: cover_id,
					title,
					description
				};
			});
		if (id != undefined && mangas != undefined) {
			return {
				id,
				mangas
			};
		}
	});
	const isFetching = query_store.isFetching;
	$: fetching = $isFetching;
	onMount(async () => {
		await query_store.execute();
	});
	$: error = $query_store?.error;
	$: staffPicks = $data_store;
</script>

<TopTitle
	label="Staff Picks"
	bind:fetching
	on:refresh={async () => {
		if (!fetching) {
			await query_store.execute();
		}
	}}
/>

{#if staffPicks}
	<Content bind:mangas={staffPicks.mangas} />
{:else if error}
	<HomeErrorComponnent {error} label="Oops! Something happens when loading the staff picks" />
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
