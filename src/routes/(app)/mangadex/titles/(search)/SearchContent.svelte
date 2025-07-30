<script lang="ts">
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import type { MangaListParams, MangaSortOrder } from "@mangadex/gql/graphql";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { getContextClient } from "@urql/svelte";
	import { debounce, last, range } from "lodash";
	import { onDestroy } from "svelte";
	import { derived, get, writable, type Readable, type Writable } from "svelte/store";
	import executeSearchQuery from "./search";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import SortSelector from "@mangadex/componnents/manga/list/sortSelector/SortSelector.svelte";

	const client = getContextClient();
	const debounce_wait = 450;
	interface Props {
		params: Readable<MangaListParams>;
		offlineStore: Readable<boolean>;
		excludeContentProfile?: boolean;
	}

	let { params: initialParam, offlineStore, excludeContentProfile }: Props = $props();
	const params = writable(get(initialParam), (set) => initialParam.subscribe(set));
	const p_p_offline = derived([params, offlineStore], (merged) => merged);
	interface InfiniteQueryData {
		data: MangaListContentItemProps[];
		offset: number;
		limit: number;
		total: number;
	}
	const infiniteQuery = createInfiniteQuery(
		derived(p_p_offline, ([$params, isOffline]) => {
			return {
				queryKey: ["manga-search", $params, isOffline],
				initialPageParam: [$params, isOffline],
				getNextPageParam(
					lastPage,
					allPages,
					[lastPageParam, lastPageOffline],
					allPageParams
				) {
					const next_offset = lastPage.limit + lastPage.offset;
					if (next_offset > lastPage.total) {
						return null;
					} else {
						return [
							{
								...lastPageParam,
								limit: lastPage.limit,
								offset: next_offset
							},
							lastPageOffline
						];
					}
				},
				async queryFn({ pageParam: [p, offline] }) {
					const res = await executeSearchQuery(client, p, offline, excludeContentProfile);
					return {
						data: res.data,
						...res.paginationData
					};
				},
				getPreviousPageParam(
					firstPage,
					allPages,
					[firstPageParam, firstPageOffline],
					allPageParams
				) {
					const next_offset = firstPage.limit - firstPage.offset;
					if (next_offset < 0) {
						return null;
					} else {
						return [
							{
								...firstPageParam,
								limit: firstPage.limit,
								offset: next_offset
							},
							firstPageOffline
						];
					}
				}
			} satisfies CreateInfiniteQueryOptions<
				InfiniteQueryData,
				Error,
				InfiniteQueryData,
				[string, MangaListParams, boolean],
				[MangaListParams, boolean]
			>;
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
	});
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
	const sortDer: Readable<MangaSortOrder | undefined> = derived(params, ($params) => {
		return $params.order ?? undefined;
	});
	const sort: Writable<MangaSortOrder | undefined> = {
		subscribe(run, invalidate) {
			return sortDer.subscribe(run, invalidate);
		},
		set(value) {
			params.update((param) => {
				param.order = value;
				return param;
			});
		},
		update(updater) {
			params.update((param) => {
				param.order = updater(param.order ?? undefined);
				return param;
			});
		}
	};
</script>

<MangaList list={$titles}>
	{#snippet additionalContent()}
		<div class="additional-content">
			<section>
				<p>Sort by:</p>
				<SortSelector {sort} />
			</section>
		</div>
	{/snippet}
</MangaList>

{#if $infiniteQuery.error}
	<ErrorComponent label="Error on loading title" error={$infiniteQuery.error} />
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
			display: flex;
			align-items: center;
			gap: 10px;
			p {
				margin: 0px;
			}
		}
	}
</style>
