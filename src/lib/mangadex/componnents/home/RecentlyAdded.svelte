<script lang="ts">
	import TopTitle from "./utils/TopTitle.svelte";
	import query from "./recently-added/query";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import Content from "./recently-added/Content.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { createQuery } from "@tanstack/svelte-query";

	const client = getContextClient();
	let recently_added_query = createQuery(() => ({
		queryKey: ["home", "recently", "added", "titles"],
		async queryFn() {
			const res = await client.query(query, {}).toPromise();
			if (res.data) {
				return res.data;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data");
			}
		}
	}));

	onMount(() => {
		return defaultContentProfile.subscribe(() => {
			recently_added_query.refetch();
		});
	});
</script>

<TopTitle
	onrefresh={async () => {
		if (!recently_added_query.isFetching) {
			await recently_added_query.refetch();
		}
	}}
	label={"Recently Added"}
	fetching={recently_added_query.isFetching}
/>

{#if recently_added_query.isSuccess}
	<Content data={recently_added_query.data} />
{:else if recently_added_query.isError}
	<HomeErrorComponnent
		error={recently_added_query.error}
		label={"Oops! Something happens when loading the recently added titles"}
	/>
{:else}
	<PopularTitleSpinner --height="10em" />
{/if}
