<script lang="ts">
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { createQuery } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import Content from "./seasonal/Content.svelte";
	import query from "./seasonal/query";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";

	const client = getContextClient();
	let seasonal = createQuery(() => ({
		queryKey: ["home", "seasonal", "titles"],
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
	onMount(() => {
		return defaultContentProfile.subscribe(() => {
			seasonal.refetch();
		});
	});
</script>

<TopTitle
	label="Seasonal"
	fetching={seasonal.isFetching}
	onrefresh={async () => {
		if (!seasonal.isFetching) {
			await seasonal.refetch();
		}
	}}
/>

{#if seasonal.isSuccess}
	<Content data={seasonal.data} />
{:else if seasonal.isError}
	<HomeErrorComponnent
		error={seasonal.error}
		label="Oops! Something happens when loading the seasonal manga"
	/>
{:else}
	<PopularTitleSpinner --height="20em" />
{/if}
