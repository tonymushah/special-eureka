<script lang="ts">
	import executeSearchQuery, {
		type CurrentUserCustomListItemData
	} from "@mangadex/componnents/manga/add-to-list/content";
	import CustomListCheckbox from "@mangadex/componnents/manga/add-to-list/CustomListCheckbox.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { CurrentLoggedLists } from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { derived as der, get } from "svelte/store";
	import MakeEmptyList from "./MakeEmptyList.svelte";

	const client = getContextClient();

	interface Props {
		selectedLists: string[];
	}

	let { selectedLists = $bindable() }: Props = $props();
	const query = createInfiniteQuery(
		der(pageLimit, (limit) => {
			return {
				queryKey: [
					"current",
					"user",
					"custom-list",
					"for-add-to-list",
					"batch",
					`limit:${limit}`
				],
				initialPageParam: {
					offset: 0,
					limit
				} satisfies CurrentLoggedLists,
				async queryFn({ pageParam }) {
					return await executeSearchQuery(client, pageParam);
				},
				getNextPageParam(lastPage, _allPages, lastPageParam) {
					let limit = lastPage.paginationData.limit;
					let next_offset = limit + lastPage.paginationData.offset;
					if (next_offset > lastPage.paginationData.total) {
						return null;
					} else {
						return {
							...lastPageParam,
							offset: next_offset,
							limit
						};
					}
				}
			} satisfies CreateInfiniteQueryOptions<
				AbstractSearchResult<CurrentUserCustomListItemData>,
				Error,
				AbstractSearchResult<CurrentUserCustomListItemData>,
				AbstractSearchResult<CurrentUserCustomListItemData>,
				readonly string[],
				CurrentLoggedLists
			>;
		})
	);

	const hasNext = der(query, ($query) => $query.hasNextPage);
	const isFetching = der(query, ($query) => $query.isLoading);
	const debounce_wait = 450;
	const fetchNext = debounce(() => {
		return get(query).fetchNextPage();
	}, debounce_wait);

	const observer = new IntersectionObserver(
		(entries) => {
			if (!$isFetching && $hasNext) {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						fetchNext();
					}
				});
			}
		},
		{
			threshold: 0.2
		}
	);
	onDestroy(() => {
		observer.disconnect();
	});
	let to_obserce_bind: HTMLElement | undefined = $state(undefined);
	$effect(() => {
		if (to_obserce_bind) {
			observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	});
</script>

<div class="list-w-make">
	<div class="lists">
		{#if $query.data}
			{#each $query.data.pages as pages}
				{#each pages.data as customList (customList.id)}
					{@const isSelected = selectedLists.includes(customList.id)}
					<div>
						<CustomListCheckbox
							name={customList.name}
							defaultChecked={isSelected}
							onChange={(value) => {
								switch (value) {
									case true:
										selectedLists.push(customList.id);
										break;
									case false:
										selectedLists = selectedLists.filter(
											(dd) => dd != customList.id
										);
										break;
									default:
										break;
								}
							}}
						/>
					</div>
				{/each}
			{/each}
		{/if}
		<div class="observer-trigger" bind:this={to_obserce_bind}>
			{#if $isFetching}
				<Fetching />
			{:else if $hasNext}
				<HasNext />
			{:else}
				<NothingToShow />
			{/if}
		</div>
	</div>

	<MakeEmptyList
		onMakeSuccess={() => {
			$query.refetch();
		}}
	/>
</div>

<style lang="scss">
	.lists {
		display: grid;
		gap: 4px;
		overflow-y: scroll;
		padding: 0px 12px;
		flex-grow: 1;
	}
	.list-w-make {
		display: contents;
	}
	.observer-trigger {
		align-items: center;
		justify-content: center;
		display: flex;
	}
</style>
