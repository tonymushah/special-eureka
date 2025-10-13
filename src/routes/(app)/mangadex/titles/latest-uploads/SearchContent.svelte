<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import ChapterFeedList from "@mangadex/componnents/chapter/feed/list/ChapterFeedList.svelte";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { ChapterFeedListItemExt } from "@mangadex/routes/user/[id]/uploads/search";
	import chapterFeedStyle from "@mangadex/stores/chapterFeedStyle";
	import pageLimit from "@mangadex/stores/page-limit";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import chapterThreadsFromChapterFeedQuery from "@mangadex/utils/threads/feed";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { openUrl } from "@tauri-apps/plugin-opener";
	import { getContextClient } from "@urql/svelte";
	import { debounce } from "lodash";
	import { onDestroy } from "svelte";
	import { derived } from "svelte/store";
	import executeSearchQuery, { type LatestUploadsParams as Params } from "./search";
	import { createForumThread } from "@mangadex/stores/create-forum-thread";
	import { ForumThreadType } from "@mangadex/gql/graphql";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";

	const client = getContextClient();
	const queryOptions = derived([pageLimit], ([$limit]) => {
		return {
			queryKey: ["latest-uploads", `limit:${$limit}`],
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
				limit: $limit
			} satisfies Params
		} satisfies CreateInfiniteQueryOptions<
			AbstractSearchResult<ChapterFeedListItemExt>,
			Error,
			AbstractSearchResult<ChapterFeedListItemExt>,
			readonly string[],
			Params
		>;
	});
	let query = createInfiniteQuery(() => $queryOptions);
	let hasNext = $derived(query.hasNextPage);
	let isFetching = $derived(query.isFetching);
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
	const createForumThreadMutation = createForumThread();
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
			} else {
				createForumThreadMutation.mutate(
					{
						id: id,
						threadType: ForumThreadType.Chapter
					},
					{
						onError(error) {
							addErrorToast("Cannot create forum thread", error);
						},
						onSuccess(data) {
							openUrl(data.forumUrl);
						}
					}
				);
			}
		}}
	/>
</div>

{#if query.error}
	<ErrorComponent
		error={query.error}
		label="Error on loading some pages"
		retry={() => query.refetch()}
	/>
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
</style>
