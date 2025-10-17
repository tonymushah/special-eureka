<script lang="ts">
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import Content from "./latest-updates/Content.svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";
	import { latest_updates_query } from "./latest-updates";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import { createQuery } from "@tanstack/svelte-query";
	const client = getContextClient();

	let latest_updates = createQuery(() => ({
		queryKey: ["home", "latest_updates"],
		async queryFn() {
			const res = await client.query(latest_updates_query, {}).toPromise();
			if (res.data) {
				return res.data;
			} else if (res.error) {
				throw res.error;
			} else {
				throw new Error("no data??");
			}
		}
	}));

	//const
	//let isFetching =
	onMount(() => {
		return defaultContentProfile.subscribe(() => {
			latest_updates.refetch();
		});
	});
</script>

<TopTitle
	label="Recent Uploads"
	fetching={latest_updates.isFetching}
	onrefresh={async () => {
		if (!latest_updates.isFetching) {
			await latest_updates.refetch();
		}
	}}
/>

{#if latest_updates.isSuccess}
	<Content chapters={latest_updates.data} />
{:else if latest_updates.isError}
	<HomeErrorComponnent
		label="Oops! Something happens when loading the latest uploaded chapters"
		error={latest_updates.error}
	/>
{:else}
	<PopularTitleSpinner --height="13em" />
{/if}
