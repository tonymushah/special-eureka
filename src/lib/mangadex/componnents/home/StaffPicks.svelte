<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { CoverImageQuality, type StaffPicksQuery } from "@mangadex/gql/graphql";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import get_value_from_title_and_random_if_undefined from "@mangadex/utils/lang/get_value_from_title_and_random_if_undefined";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import type { StaffPicksTitle } from "./staff-picks";
	import Content from "./staff-picks/Content.svelte";
	import query from "./staff-picks/query";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";

	const client = getContextClient();
	let staff_picks = createQuery(() => ({
		queryKey: ["home", "staff-picks", "titles"],
		async queryFn() {
			const res = await client.query(query, {}).toPromise();
			if (res.data) {
				return res.data;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		}
	}));
	function treatData(data: StaffPicksQuery) {
		return data.home.staffPicks.relationships.titles.map<StaffPicksTitle>((t) => {
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
				get_value_from_title_and_random_if_undefined(t.attributes.description, "en") ?? "";
			return {
				id: manga_id,
				coverImage,
				coverImageAlt: cover_id,
				title,
				description
			};
		});
	}
	onMount(() => {
		return defaultContentProfile.subscribe(() => {
			staff_picks.refetch();
		});
	});
</script>

<TopTitle
	label="Staff Picks"
	fetching={staff_picks.isFetching}
	onrefresh={async () => {
		if (!staff_picks.isFetching) {
			await staff_picks.refetch();
		}
	}}
/>

{#if staff_picks.isSuccess}
	<Content mangas={treatData(staff_picks.data)} />
{:else if staff_picks.isError}
	<HomeErrorComponnent
		error={staff_picks.error}
		label="Oops! Something happens when loading the staff picks"
	/>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
