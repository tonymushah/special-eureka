<script lang="ts">
	import TopTitle from "./utils/TopTitle.svelte";
	import query from "./recently-added/query";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import Content from "./recently-added/Content.svelte";

	const client = getContextClient();
	const recently_added_query_store = specialQueryStore({
		client,
		query,
		variable: {}
	});
	const isFetching = recently_added_query_store.isFetching;

	let error = $derived($recently_added_query_store?.error);
	let data = $derived($recently_added_query_store?.data);
	onMount(async () => {
		await recently_added_query_store.execute();
	});
</script>

<TopTitle
	onrefresh={async () => {
		if (!$isFetching) {
			await recently_added_query_store.execute();
		}
	}}
	label={"Recently Added"}
	bind:fetching={$isFetching}
/>

{#if data}
	<Content {data} />
{:else if error}
	<HomeErrorComponnent
		{error}
		label={"Oops! Something happens when loading the recently added titles"}
	/>
{:else}
	<PopularTitleSpinner --height="10em" />
{/if}
