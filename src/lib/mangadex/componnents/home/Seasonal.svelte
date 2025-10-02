<script lang="ts">
	import TopTitle from "./utils/TopTitle.svelte";
	import query from "./seasonal/query";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import Content from "./seasonal/Content.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";

	const client = getContextClient();
	const query_store = specialQueryStore({
		client,
		query,
		variable: {}
	});
	let error = $derived($query_store?.error);
	let data = $derived($query_store?.data);
	const isFetching = query_store.isFetching;
	let fetching = $derived($isFetching);
	onMount(() => {
		return defaultContentProfile.subscribe(() => query_store.execute());
	});
</script>

<TopTitle
	label="Seasonal"
	{fetching}
	onrefresh={async () => {
		if (!fetching) {
			await query_store.execute();
		}
	}}
/>

{#if data}
	<Content {data} />
{:else if error}
	<HomeErrorComponnent {error} label="Oops! Something happens when loading the seasonal manga" />
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
