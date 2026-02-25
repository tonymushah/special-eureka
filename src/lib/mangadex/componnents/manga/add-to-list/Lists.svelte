<script lang="ts">
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
	import { derived as der } from "svelte/store";
	import { ActionMode } from ".";
	import type { CurrentUserCustomListItemData } from "./content";
	import executeSearchQuery from "./content";
	import MakeANewList from "./MakeANewList.svelte";
	import { mutationQueryMutation } from "./mutation";

	const client = getContextClient();

	interface Props {
		mangaId: string;
		selectedListMap: Map<string, ActionMode>;
	}
	let { mangaId, selectedListMap = $bindable() }: Props = $props();
	const queryOptions = der(pageLimit, (limit) => {
		return {
			queryKey: ["current", "user", "custom-list", "for-add-to-list", `limit:${limit}`],
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
			readonly string[],
			CurrentLoggedLists
		>;
	});
	let query = createInfiniteQuery(() => $queryOptions);

	let hasNext = $derived(query.hasNextPage);
	let isFetching = $derived(query.isFetching);
	const debounce_wait = 450;
	const fetchNext = debounce(() => {
		return query.fetchNextPage();
	}, debounce_wait);

	const observer = new IntersectionObserver(
		(entries) => {
			if (!isFetching && hasNext) {
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
	let queryData = $derived.by(() => {
		return new Map(query.data?.pages.flatMap((p) => p.data).map((d) => [d.id, d]))
			.values()
			.toArray();
	});
	let customListSelections = $derived.by(
		() =>
			new Map(
				queryData.map((customList) => {
					const isSelected = customList.titles.includes(mangaId);
					let toRet: boolean;
					if (selectedListMap.has(customList.id)) {
						toRet = selectedListMap.get(customList.id) == ActionMode.Add;
					} else {
						toRet = isSelected;
					}
					return [customList.id, toRet];
				})
			)
	);
</script>

<div class="list-w-make">
	<div class="lists">
		{#if query.isSuccess}
			{#each queryData as customList (customList.id)}
				{@const isSelected = customList.titles.includes(mangaId)}
				<div class="list-entry">
					<input
						class="checkbox"
						id={`select-list-${customList.id}`}
						bind:checked={
							() => customListSelections.get(customList.id),
							(value) => {
								switch (value) {
									case true:
										if (!isSelected) {
											selectedListMap.set(customList.id, ActionMode.Add);
										}
										break;

									case false:
										if (isSelected) {
											selectedListMap.set(customList.id, ActionMode.Remove);
										} else {
											selectedListMap.delete(customList.id);
										}
										break;

									default:
										break;
								}
							}
						}
						type="checkbox"
					/>
					<label for={`select-list-${customList.id}`}>{customList.name}</label>
				</div>
			{/each}
		{/if}
		<div class="observer-trigger" bind:this={to_obserce_bind}>
			{#if isFetching}
				<Fetching />
			{:else if hasNext}
				<HasNext />
			{:else}
				<NothingToShow />
			{/if}
		</div>
	</div>

	<MakeANewList
		{mangaId}
		onMakeSuccess={() => {
			query.refetch();
		}}
	/>
</div>

<style lang="scss">
	.lists {
		display: grid;
		gap: 4px;
		overflow-y: scroll;
		padding: 0px 12px;
		flex: 1;
	}
	.list-w-make {
		display: contents;
	}
	.observer-trigger {
		align-items: center;
		justify-content: center;
		display: flex;
	}
	.list-entry {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 6px;
		.checkbox {
			width: 24px;
			height: 24px;
		}
	}
</style>
