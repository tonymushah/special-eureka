<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ChapterFeedList from "@mangadex/componnents/chapter/feed/list/ChapterFeedList.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import { OrderDirection, type ChapterSortOrder } from "@mangadex/gql/graphql";
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
		type UserUploadsFeedChapterParams
	} from "./search";
	import pageLimit from "@mangadex/stores/page-limit";
	import ChapterSortSelector from "@mangadex/componnents/chapter/feed/list/sort/ChapterSortSelector.svelte";
	import chapterThreadsFromChapterFeedQuery from "@mangadex/utils/threads/feed";
	import { openUrl } from "@tauri-apps/plugin-opener";

	interface Props {
		userId: Readable<string>;
	}

	let { userId }: Props = $props();
	const client = getContextClient();
	const order = writable<ChapterSortOrder | undefined>({
		readableAt: OrderDirection.Descending
	});
	const queryOptions = derived([userId, pageLimit, order], ([$userId, $limit, $order]) => {
		return {
			queryKey: ["user", $userId, "uploads", `limit:${$limit}`, `${$order}`],
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
			},
			initialPageParam: {
				user: $userId,
				limit: $limit,
				order: $order
			} satisfies UserUploadsFeedChapterParams
		} satisfies CreateInfiniteQueryOptions<
			AbstractSearchResult<ChapterFeedListItemExt>,
			Error,
			AbstractSearchResult<ChapterFeedListItemExt>,
			readonly string[],
			UserUploadsFeedChapterParams
		>;
	});
	let query = createInfiniteQuery(() => $queryOptions);
	let hasNext = $derived(query.hasNextPage);
	let isFetching = $derived(query.isLoading);
	let feed = $derived(query.data?.pages.flatMap((e) => e.data) ?? []);
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
			// NOTE I don't know but this statement feels wrong so I commented it
			// Please make a PR to uncomment it
			// observer.unobserve(to_obserce_bind);
			observer.observe(to_obserce_bind);
		}
	});
	const threads = chapterThreadsFromChapterFeedQuery(query);
</script>

<div class="result">
	<ChapterFeedList
		list={feed}
		style={chapterFeedStyle}
		onmangaClick={(e) => {
			const id = e.id;
			goto(
				route("/mangadex/title/[id]", {
					id
				})
			);
		}}
		oncomments={({ id }) => {
			const url = $threads.get(id);
			if (url) {
				openUrl(url);
			}
		}}
	>
		{#snippet additionalContent()}
			<div class="additional-content">
				<section>
					<p>Sort by:</p>
					<ChapterSortSelector sort={order} />
				</section>
			</div>
		{/snippet}
	</ChapterFeedList>
</div>

<div class="observer-trigger" bind:this={to_obserce_bind}>
	{#if isFetching}
		<Fetching />
	{:else if hasNext}
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
