<script lang="ts">
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";
	import { createCurrentUserReportsQuery } from "@mangadex/gql-docs/report";
	import {
		ReportStatus,
		type InputMaybe,
		type ReportAttributes,
		type ReportCategory,
		type ReportSortOrder
	} from "@mangadex/gql/graphql";
	import pageLimit from "@mangadex/stores/page-limit";
	import { debounce, random, range } from "lodash";
	import { onDestroy } from "svelte";
	import CategoryFilter from "./_filter/CategoryFilter.svelte";
	import ObjectId from "./_filter/ObjectId.svelte";
	import SortOrder from "./_filter/SortOrder.svelte";
	import Status from "./_filter/Status.svelte";
	import Reason from "./_filter/Reason.svelte";
	import type { ReportData } from "./types";
	import Content from "./_content/Content.svelte";
	import { v4, v5, v7 } from "uuid";
	import { dev } from "$app/environment";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";

	let category: InputMaybe<ReportCategory> = $state();
	let objectId: InputMaybe<string> = $state();
	let order: InputMaybe<ReportSortOrder> = $state();
	let reasonId: InputMaybe<string> = $state();
	let status: InputMaybe<ReportStatus> = $state();
	let reports = $derived(
		createCurrentUserReportsQuery({
			limit: $pageLimit,
			category,
			objectId: (objectId?.length ?? 0) == 0 ? undefined : objectId,
			order,
			reasonId,
			status
		})
	);
	let isFetching = $derived(reports.isFetching);
	let hasNext = $derived(reports.hasNextPage);
	const fetchNext = debounce(async function () {
		return await reports.fetchNextPage();
	});
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
	let allowDevData = $state(false);
	let data = $derived.by(() => {
		if (allowDevData) {
			const data: ReportData[] = range(0, 10).map(() => {
				return {
					id: v4(),
					details:
						"Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores expedita officia suscipit odit accusantium natus in perspiciatis ex doloribus ipsum cupiditate ad corporis aut, praesentium nulla, sit culpa. Aliquam, ipsam.",
					objectId: v7(),
					status: random(1, 3) == 2 ? ReportStatus.Waiting : ReportStatus.Accepted,
					createdAt: new Date()
				};
			});
			return data;
		}
		let map = new Map<string, ReportAttributes>();
		if (reports.isSuccess) {
			reports.data.pages
				.flatMap((d) => d.data)
				.forEach((e) => {
					map.set(e.id, e.attributes);
				});
			return map
				.entries()
				.map(
					([id, att]) =>
						({
							id,
							...att
						}) satisfies ReportData
				)
				.toArray();
		}
		return [];
	});
</script>

<div class="filters">
	<ObjectId bind:objectId />
	<CategoryFilter bind:category />
	<Reason bind:reasonId {category} />
	<SortOrder bind:order />
	<Status bind:status />
	{#if dev}
		<ButtonAccent
			onclick={() => {
				allowDevData = !allowDevData;
			}}
			>{#if allowDevData}
				Dev data
			{:else}
				Real data
			{/if}</ButtonAccent
		>
	{/if}
</div>

{#if allowDevData && data.length > 0}
	<Content {data} />
{:else if reports.isError}
	<ErrorComponent
		label="Error on loading your reports"
		error={reports.error}
		retry={() => reports.refetch()}
	/>
{:else if data.length > 0}
	<Content {data} />
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
	.filters {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		align-items: center;
		margin-bottom: 12px;
	}
</style>
