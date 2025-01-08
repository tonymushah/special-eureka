<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { getContextClient } from "@urql/svelte";
	import { onMount } from "svelte";
	import Content from "./latest-updates/Content.svelte";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import TopTitle from "./utils/TopTitle.svelte";
	const client = getContextClient();
	const latest_updates_query = graphql(/* GraphQL */ `
		query recentlyAddedHome {
			home {
				recentlyUploaded {
					data {
						id
						attributes {
							title
							pages
							translatedLanguage
							readableAt
							chapter
							volume
						}
						relationships {
							scanlationGroups {
								id
								attributes {
									name
								}
							}
							user {
								id
								attributes {
									username
									roles
								}
							}
							manga {
								id
								attributes {
									title
								}
								relationships {
									coverArt {
										id
										attributes {
											fileName
										}
									}
								}
							}
						}
					}
				}
			}
		}
	`);
	const latest_updates_query_store = specialQueryStore({
		client,
		query: latest_updates_query,
		variable: {}
	});
	let chapters = $derived($latest_updates_query_store?.data);
	const latest_updates_fetching = latest_updates_query_store.isFetching;

	let global_fetching = $derived($latest_updates_fetching);
	let error = $derived($latest_updates_query_store?.error);

	//const
	//let isFetching =
	onMount(async () => {
		await latest_updates_query_store.execute();
	});
</script>

<TopTitle
	label="Recent Uploads"
	fetching={global_fetching}
	on:refresh={async () => {
		if (!global_fetching) {
			await latest_updates_query_store.execute();
		}
	}}
/>

{#if chapters}
	<Content {chapters} />
{:else if error}
	<HomeErrorComponnent
		label="Oops! Something happens when loading the latest uploaded chapters"
		{error}
	/>
{:else}
	<PopularTitleSpinner --height="13em" />
{/if}
