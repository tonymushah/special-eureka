<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ChapterFeedList from "@mangadex/componnents/chapter/feed/list/ChapterFeedList.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import { OrderDirection, type MangaFeedSortOrder } from "@mangadex/gql/graphql";
	import chapterFeedStyle from "@mangadex/stores/chapterFeedStyle";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import type { Readable } from "svelte/store";
	import { derived, get, writable } from "svelte/store";
	import executeSearchQuery, {
		type ChapterFeedListItemExt,
		type CustomListFeedChapterParams
	} from "./search";
	import pageLimit from "@mangadex/stores/page-limit";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import MangaFeedSortOrderSelection from "@mangadex/componnents/manga/feed/sort/MangaFeedSortOrderSelection.svelte";

	interface Props {
		customListId: Readable<string>;
		isPrivate: Readable<boolean>;
	}

	let { customListId, isPrivate }: Props = $props();
	const order = writable<MangaFeedSortOrder | undefined>({
		readableAt: OrderDirection.Descending
	});
	const client = getContextClient();
	const query = createInfiniteQuery(
		derived(
			[customListId, pageLimit, isPrivate, order],
			([$customListId, $limit, $isPrivate, $order]) => {
				return {
					queryKey: [
						"customList",
						$customListId,
						"feed",
						`limit:${$limit}`,
						`private:${$isPrivate}`,
						`${$order}`
					],
					async queryFn({ pageParam }) {
						return await executeSearchQuery(client, pageParam, $isPrivate);
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
					},
					initialPageParam: {
						listId: $customListId,
						limit: $limit,
						order: $order
					} satisfies CustomListFeedChapterParams
				} satisfies CreateInfiniteQueryOptions<
					AbstractSearchResult<ChapterFeedListItemExt>,
					Error,
					AbstractSearchResult<ChapterFeedListItemExt>,
					readonly string[],
					CustomListFeedChapterParams
				>;
			}
		)
	);
	const hasNext = derived(query, ($query) => $query.hasNextPage);
	const isFetching = derived(query, ($query) => $query.isLoading);
	const feed = derived(query, ($query) => $query.data?.pages.flatMap((e) => e.data) ?? []);
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
			// NOTE I don't know but this statement feels wrong so I commented it
			// Please make a PR to uncomment it
			// observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	});
</script>

<div class="result">
	<ChapterFeedList
		list={$feed}
		style={chapterFeedStyle}
		onmangaClick={(e) => {
			const id = e.id;
			goto(
				route("/mangadex/title/[id]", {
					id
				})
			);
		}}
	>
		{#snippet additionalContent()}
			<div class="additional-content">
				<section>
					<p>Sort by:</p>
					<MangaFeedSortOrderSelection sort={order} />
				</section>
			</div>
		{/snippet}
	</ChapterFeedList>
</div>

{#if $query.error}
	<ErrorComponent
		label="Error on loading title"
		error={$query.error}
		retry={() => {
			$query.refetch();
		}}
	/>
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

<style lang="scss">
	.observer-trigger {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/*.result {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}*/
	.additional-content {
		display: flex;
		align-items: center;
		section {
			display: flex;
			align-items: center;
			gap: 10px;
			p {
				margin: 0px;
			}
		}
	}
</style>
