<script lang="ts">
	import TopTitle from "./utils/TopTitle.svelte";
	import query from "./seasonal/query";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import Content from "./seasonal/Content.svelte";

	const client = getContextClient();
	const query_store = specialQueryStore({
		client,
		query,
		variable: {}
	});
	$: error = $query_store?.error;
	$: data = $query_store?.data;
	const isFetching = query_store.isFetching;
	$: fetching = $isFetching;
	onMount(async () => {
		await query_store.execute();
	});
</script>

<TopTitle
	label="Seasonal"
	bind:fetching
	on:refresh={async () => {
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
