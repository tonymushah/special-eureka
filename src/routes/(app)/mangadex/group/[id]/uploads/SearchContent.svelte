<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ChapterFeedList from "@mangadex/componnents/chapter/feed/list/ChapterFeedList.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import { OrderDirection, type ChapterSortOrder } from "@mangadex/gql/graphql";
	import type { ChapterFeedListItemExt } from "@mangadex/routes/user/[id]/uploads/search";
	import chapterFeedStyle from "@mangadex/stores/chapterFeedStyle";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import type { Readable } from "svelte/store";
	import { derived, get, writable } from "svelte/store";
	import executeSearchQuery, {
		type ScanlationGroupUploadsFeedChapterParams as Params
	} from "./search";
	import pageLimit from "@mangadex/stores/page-limit";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import ChapterSortSelector from "@mangadex/componnents/chapter/feed/list/sort/ChapterSortSelector.svelte";
	import chapterThreadsFromChapterFeedQuery from "@mangadex/utils/threads/feed";
	import { openUrl } from "@tauri-apps/plugin-opener";

	interface Props {
		groupId: Readable<string>;
	}

	const sort = writable<ChapterSortOrder | undefined>({
		readableAt: OrderDirection.Descending
	});
	let { groupId }: Props = $props();
	const client = getContextClient();
	const query = createInfiniteQuery(
		derived([groupId, pageLimit, sort], ([$groupId, $limit, $sort]) => {
			return {
				queryKey: ["group", $groupId, "uploads", `limit:${$limit}`, `${$sort}`],
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
					group: $groupId,
					limit: $limit,
					order: $sort
				} satisfies Params
			} satisfies CreateInfiniteQueryOptions<
				AbstractSearchResult<ChapterFeedListItemExt>,
				Error,
				AbstractSearchResult<ChapterFeedListItemExt>,
				readonly string[],
				Params
			>;
		})
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
	const threads = chapterThreadsFromChapterFeedQuery(query);
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
					<ChapterSortSelector {sort} />
				</section>
			</div>
		{/snippet}
	</ChapterFeedList>
</div>

{#if $query.error}
	<ErrorComponent
		error={$query.error}
		label="Error on loading some pages"
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
	.additional-content {
		display: flex;
		align-items: center;
		section {
			display: grid;
			p {
				margin: 0px;
			}
		}
	}
	/*.result {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 8px;
	}*/
</style>
