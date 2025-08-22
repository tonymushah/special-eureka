<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { UserLibrarySectionParam } from "@mangadex/gql/graphql";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { Client, getContextClient } from "@urql/svelte";
	import { debounce, last, range } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import { derived, get, writable } from "svelte/store";
	import LibContentFilter from "./LibContentFilter.svelte";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import pageLimit from "@mangadex/stores/page-limit";

	const client = getContextClient();
	const debounce_wait = 450;
	interface Props {
		executeSearchQuery: (
			client: Client,
			param?: UserLibrarySectionParam
		) => Promise<AbstractSearchResult<MangaListContentItemProps>>;
		section: string;
	}

	let { executeSearchQuery, section }: Props = $props();
	const params = writable<UserLibrarySectionParam>({});
	const p_p_offline = derived([params, pageLimit], ([$params, $pageLimit]) => {
		$params.limit = $pageLimit;
		return $params;
	});
	interface InfiniteQueryData {
		data: MangaListContentItemProps[];
		offset: number;
		limit: number;
		total: number;
	}
	const infiniteQuery = createInfiniteQuery(
		derived(p_p_offline, ($params) => {
			return {
				queryKey: ["user", "library", section, $params],
				initialPageParam: [$params],
				getNextPageParam(lastPage, allPages, [lastPageParam], allPageParams) {
					const next_offset = lastPage.limit + lastPage.offset;
					if (next_offset > lastPage.total) {
						return null;
					} else {
						return [
							{
								...lastPageParam,
								limit: lastPage.limit,
								offset: next_offset
							}
						];
					}
				},
				async queryFn({ pageParam: [p] }) {
					const res = await executeSearchQuery(client, p);
					return {
						data: res.data,
						...res.paginationData
					};
				},
				getPreviousPageParam(firstPage, allPages, [firstPageParam], allPageParams) {
					const next_offset = firstPage.limit - firstPage.offset;
					if (next_offset < 0) {
						return null;
					} else {
						return [
							{
								...firstPageParam,
								limit: firstPage.limit,
								offset: next_offset
							}
						];
					}
				}
			} satisfies CreateInfiniteQueryOptions<
				InfiniteQueryData,
				Error,
				InfiniteQueryData,
				[string, string, string, UserLibrarySectionParam],
				[UserLibrarySectionParam]
			>;
		})
	);
	onMount(() =>
		defaultContentProfile.subscribe(() => {
			get(infiniteQuery).refetch();
		})
	);
	const titles = derived(infiniteQuery, (result) => {
		if (result.isLoading) {
			return [];
		}
		return result.data?.pages.map((d) => d.data) ?? [];
	});
	const isFetching = derived(infiniteQuery, (result) => result.isFetching);
	const hasNext = derived(infiniteQuery, (result) => result.hasNextPage);
	/// TODO implement this
	const pages = derived(infiniteQuery, (result) => {
		const initalPage = result.data?.pages[0];
		if (initalPage) {
			return Math.floor(initalPage.total / initalPage.limit);
		}
	});
	const currentPage = derived(infiniteQuery, (result) => {
		const current = last(result.data?.pages);
		const initalPage = result.data?.pages[0];
		if (current && initalPage) {
			return range(initalPage.offset, current.total, initalPage.limit).findIndex(
				(step) => step <= current.offset
			);
		}
	});
	const fetchNext = debounce(async function () {
		const inf = get(infiniteQuery);
		return await inf.fetchNextPage();
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
			threshold: 1.0
		}
	);
	let to_obserce_bind: HTMLElement | undefined = $state(undefined);
	$effect(() => {
		if (to_obserce_bind) {
			observer.observe(to_obserce_bind);
			return () => {
				if (to_obserce_bind) observer.unobserve(to_obserce_bind);
			};
		}
	});
	onDestroy(() => {
		observer.disconnect();
	});
</script>

<MangaList list={$titles}>
	{#snippet additionalContent()}
		<div class="additional-content">
			<LibContentFilter {params} />
		</div>
	{/snippet}
</MangaList>

{#if $infiniteQuery.error}
	<ErrorComponent
		label="Error on loading title"
		error={$infiniteQuery.error}
		retry={() => $infiniteQuery.refetch()}
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
	}
</style>
