<script lang="ts">
	import { graphql } from "@mangadex/gql";
	import Title from "../theme/texts/title/Title.svelte";
	import TopTitle from "./utils/TopTitle.svelte";
	import specialQueryStore from "@mangadex/utils/gql-stores/specialQueryStore";
	import { getContextClient, queryStore } from "@urql/svelte";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import HomeErrorComponnent from "./utils/HomeErrorComponnent.svelte";
	import PopularTitleSpinner from "./utils/PopularTitleSpinner.svelte";
	import type { ResMapInner } from "./latest-updates";
	import Content from "./latest-updates/Content.svelte";
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
							}
						}
					}
				}
			}
		}
	`);
	const get_covers_query = graphql(/* GraphQL */ `
		query getMangaCovers($mangaIds: [UUID!]!) {
			manga {
				list(params: { mangaIds: $mangaIds }) {
					data {
						id
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
	`);
	const latest_updates_query_store = specialQueryStore({
		client,
		query: latest_updates_query,
		variable: {}
	});
	$: chapters = $latest_updates_query_store?.data;
	const latest_updates_fetching = latest_updates_query_store.isFetching;
	const covers_query = derived(latest_updates_query_store, ($q) => {
		const mangaIds = $q?.data?.home.recentlyUploaded.data.map((c) => c.relationships.manga.id);
		if (mangaIds != undefined) {
			const query = queryStore({
				client,
				query: get_covers_query,
				variables: {
					mangaIds: mangaIds
				}
			});
			return query;
		}
	});

	$: _covers = $covers_query;
	$: __covers = _covers
		? derived(_covers, ($q) => {
				const d = $q.data?.manga.list.data.map<ResMapInner>((m) => [
					m.id,
					{
						id: m.relationships.coverArt.id,
						filename: m.relationships.coverArt.attributes.fileName
					}
				]);
				if (d) {
					return new Map(d);
				}
			})
		: undefined;
	$: covers = $__covers;
	$: covers_fetching = $_covers?.fetching == true;
	$: global_fetching = covers_fetching && $latest_updates_fetching;
	$: error = $latest_updates_query_store?.error;

	//const
	//let isFetching =
	onMount(async () => {
		await latest_updates_query_store.execute();
	});
</script>

<TopTitle
	label="Recent Uploads"
	bind:fetching={global_fetching}
	on:refresh={async () => {
		if (!global_fetching) {
			await latest_updates_query_store.execute();
		}
	}}
/>

{#if chapters}
	<Content bind:chapters bind:covers />
{:else if error}
	<HomeErrorComponnent {error} />
{:else}
	<PopularTitleSpinner --height="13em" />
{/if}
