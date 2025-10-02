<script lang="ts">
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy } from "svelte";
	import type { CoverInput } from "./CoverContents.svelte";
	import CoverContents from "./CoverContents__.svelte";
	import { getCoversImageStoreContext } from "./utils/coverImageStoreContext";
	import getMangaCoversQuery from "./utils/query";
	import { get, derived as der } from "svelte/store";
	import { createInfiniteQuery } from "@tanstack/svelte-query";
	import pageLimit from "@mangadex/stores/page-limit";
	import ErrorComponent from "@mangadex/componnents/ErrorComponent.svelte";
	import Fetching from "@mangadex/componnents/search/content/Fetching.svelte";
	import HasNext from "@mangadex/componnents/search/content/HasNext.svelte";
	import NothingToShow from "@mangadex/componnents/search/content/NothingToShow.svelte";

	const d = getTitleLayoutData();
	const data = d.layoutData;
	const id = data!.id;
	const client = getContextClient();
	const imagesStore = getCoversImageStoreContext();

	const query = createInfiniteQuery({
		queryKey: ["title", id, "covers"],
		async queryFn({ pageParam }) {
			const res = await client
				.query(getMangaCoversQuery, {
					id,
					offset: pageParam.offset
				})
				.toPromise();
			if (res.error) {
				throw res.error;
			} else if (res.data == undefined) {
				throw new Error("Require data");
			} else {
				return {
					list: res.data.cover.list.data.map<
						CoverInput & {
							filename: string;
						}
					>((v) => {
						const locale =
							v.attributes.locale == null ? undefined : v.attributes.locale;
						const title =
							v.attributes.volume == null || v.attributes.volume == undefined
								? v.id
								: `Volume ${v.attributes.volume}`;
						return {
							id: v.id,
							title,
							alt: v.attributes.fileName,
							locale: locale,
							filename: v.attributes.fileName
						};
					}),
					offset: res.data.cover.list.offset,
					limit: res.data.cover.list.limit,
					total: res.data.cover.list.total
				};
			}
		},
		initialPageParam: {
			offset: 0,
			limit: get(pageLimit)
		},

		networkMode: "always",
		getNextPageParam(lastPage) {
			const nextPageOffset = lastPage.offset + lastPage.limit;
			if (nextPageOffset <= lastPage.total) {
				return {
					limit: lastPage.limit,
					offset: nextPageOffset
				};
			} else {
				return null;
			}
		}
	});
	const interObs = new IntersectionObserver(async (o) => {
		o.forEach((_o) => {
			if (_o.isIntersecting) {
				$query.fetchNextPage();
			}
		});
	});
	let interObsEl: HTMLDivElement | undefined = $state(undefined);
	$effect.pre(() => {
		if (interObsEl) {
			interObs.observe(interObsEl);
		}
	});
	const coversData = der(query, ($query) =>
		new Set($query.data?.pages.flatMap((c) => c.list)).values().toArray()
	);
	const querySub = coversData.subscribe(($covers) => {
		const set = $covers.map((c) => {
			return {
				id: c.id,
				image: get_cover_art({
					client,
					cover_id: c.id,
					manga_id: id,
					filename: c.filename
				})
			};
		});
		imagesStore.setByBatch(set);
	});

	const isDataEmpty = der(coversData, ($covers) => $covers.length == 0);
	onDestroy(() => {
		querySub();
		interObs.disconnect();
	});
</script>

<CoverContents
	{isDataEmpty}
	isLoading={der(query, ($query) => $query.isLoading)}
	isInitialLoading={der(query, ($query) => $query.isLoading)}
	{coversData}
/>
{#if $query.isError}
	<ErrorComponent
		label={"Error on fetching title covers"}
		retry={() => {
			$query.refetch();
		}}
		error={$query.error}
	/>
{/if}
<div bind:this={interObsEl} class="observer-trigger">
	{#if $query.isFetching}
		<Fetching />
	{:else if $query.hasNextPage}
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
</style>
