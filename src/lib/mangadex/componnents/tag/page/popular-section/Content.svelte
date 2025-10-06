<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import MangaList from "@mangadex/componnents/manga/list/MangaList.svelte";
	import type { MangaListContentItemProps } from "@mangadex/componnents/manga/list/MangaListContent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import {
		DatePeriod,
		type TagPopularList,
		type UserLibrarySectionParam
	} from "@mangadex/gql/graphql";
	import type AbstractSearchResult from "@mangadex/utils/searchResult/AbstractSearchResult";
	import { createInfiniteQuery, type CreateInfiniteQueryOptions } from "@tanstack/svelte-query";
	import { Client, getContextClient } from "@urql/svelte";
	import { debounce, last, range } from "lodash";
	import { onDestroy, onMount } from "svelte";
	import { derived, get, writable, type Writable } from "svelte/store";
	import defaultContentProfile from "@mangadex/content-profile/graphql/defaultProfile";
	import pageLimit from "@mangadex/stores/page-limit";
	import executeSearchQuery from "./content";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";

	const client = getContextClient();
	const debounce_wait = 450;
	interface Props {
		id: string;
	}

	let { id }: Props = $props();
	const params = writable<TagPopularList>({});
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
	const infiniteQueryOptions = derived(p_p_offline, ($params) => {
		return {
			queryKey: ["tag", id, "popular-titles", $params],
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
				const res = await executeSearchQuery(client, id, p);
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
			[string, string, string, TagPopularList],
			[TagPopularList]
		>;
	});
	let infiniteQuery = createInfiniteQuery(() => $infiniteQueryOptions);
	onMount(() =>
		defaultContentProfile.subscribe(() => {
			infiniteQuery.refetch();
		})
	);
	let titles = $derived.by(() => {
		const result = infiniteQuery;
		if (result.isLoading) {
			return [];
		}
		return result.data?.pages.map((d) => d.data) ?? [];
	});
	let isFetching = $derived(infiniteQuery.isFetching);
	let hasNext = $derived(infiniteQuery.hasNextPage);

	const fetchNext = debounce(async function () {
		const inf = infiniteQuery;
		return await inf.fetchNextPage();
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
	const datePeriodRead = derived(params, (p) => p.datePeriod ?? DatePeriod.AllTime);
	const datePeriod: Writable<DatePeriod> = {
		subscribe(run, invalidate) {
			return datePeriodRead.subscribe(run, invalidate);
		},
		set(value) {
			params.update((inner) => {
				inner.datePeriod = value;
				return inner;
			});
		},
		update(updater) {
			params.update((inner) => {
				inner.datePeriod = updater(get(datePeriodRead));
				return inner;
			});
		}
	};
</script>

<MangaList list={titles}>
	{#snippet additionalContent()}
		<div class="additional-content">
			<ButtonAccentOnlyLabel
				label="Past week"
				onclick={() => {
					if ($datePeriod == DatePeriod.ThisWeek) {
						$datePeriod = DatePeriod.AllTime;
					} else {
						$datePeriod = DatePeriod.ThisWeek;
					}
				}}
				variant={$datePeriod == DatePeriod.ThisWeek ? "5" : "default"}
			/>
			<ButtonAccentOnlyLabel
				label="Past 2 weeks"
				onclick={() => {
					if ($datePeriod == DatePeriod.Past_2Weeks) {
						$datePeriod = DatePeriod.AllTime;
					} else {
						$datePeriod = DatePeriod.Past_2Weeks;
					}
				}}
				variant={$datePeriod == DatePeriod.Past_2Weeks ? "5" : "default"}
			/>
			<ButtonAccentOnlyLabel
				label="Past month"
				onclick={() => {
					if ($datePeriod == DatePeriod.ThisMonth) {
						$datePeriod = DatePeriod.AllTime;
					} else {
						$datePeriod = DatePeriod.ThisMonth;
					}
				}}
				variant={$datePeriod == DatePeriod.ThisMonth ? "5" : "default"}
			/>
			<ButtonAccentOnlyLabel
				label="Past 6 monts"
				onclick={() => {
					if ($datePeriod == DatePeriod.Past_6Months) {
						$datePeriod = DatePeriod.AllTime;
					} else {
						$datePeriod = DatePeriod.Past_6Months;
					}
				}}
				variant={$datePeriod == DatePeriod.Past_6Months ? "5" : "default"}
			/>
			<ButtonAccentOnlyLabel
				label="Past year"
				onclick={() => {
					if ($datePeriod == DatePeriod.ThisYear) {
						$datePeriod = DatePeriod.AllTime;
					} else {
						$datePeriod = DatePeriod.ThisYear;
					}
				}}
				variant={$datePeriod == DatePeriod.ThisYear ? "5" : "default"}
			/>
		</div>
	{/snippet}
</MangaList>

{#if infiniteQuery.isError}
	<ErrorComponent
		label="Error on loading title"
		error={infiniteQuery.error}
		retry={() => infiniteQuery.refetch()}
	/>
{/if}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="observer-trigger"
	bind:this={to_obserce_bind}
	onmouseenter={() => {
		if (!isFetching && hasNext) {
			fetchNext();
		}
	}}
>
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
	.additional-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 4px;
	}
</style>
