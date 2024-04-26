<script lang="ts">
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/+layout.svelte";
	import { getContextClient } from "@urql/svelte";
	import { initCoverImageStoreContext } from "./utils/coverImageStoreContext";
	import type { CoverInput } from "./CoverContents.svelte";
	import getMangaCoversQuery from "./utils/query";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { onDestroy, onMount } from "svelte";
	import { fade, slide } from "svelte/transition";
	import CoverContents from "./CoverContents.svelte";

	const { layoutData: data } = getTitleLayoutData();
	const id = data!.id;
	const client = getContextClient();
	const imagesStore = initCoverImageStoreContext();
	let isLoading = false;
	let currentOffset = 0;
	let isAtEnd = false;
	let coversData: CoverInput[] = [];
	async function fetchCovers() {
		if (isAtEnd) {
			throw new Error("No next data can be fetched");
		}
		const res = await client
			.query(getMangaCoversQuery, {
				id,
				offset: currentOffset
			})
			.toPromise();
		if (res.error) {
			throw res.error;
		}
		const covers: CoverInput[] = [];
		const list = res.data?.cover.list;
		if (list) {
			covers.push(
				...list.data.map<CoverInput>((v) => {
					const locale = v.attributes.locale == null ? undefined : v.attributes.locale;
					const title =
						v.attributes.volume == null || v.attributes.volume == undefined
							? v.id
							: `Volume ${v.attributes.volume}`;
					return {
						id: v.id,
						title,
						alt: v.attributes.fileName,
						locale: locale
					};
				})
			);
			imagesStore.setByBatch(
				list.data.map((v) => {
					return {
						id: v.id,
						image: get_cover_art({
							cover_id: v.id,
							filename: v.attributes.fileName,
							manga_id: id,
							client
						})
					};
				})
			);
			if (covers.length > 0) {
				if (currentOffset == 0) {
					coversData = covers;
				} else {
					coversData = [...coversData, ...covers];
				}
				const nextOffset = currentOffset + list.limit;
				if (nextOffset >= list.total) {
					isAtEnd = true;
				} else {
					currentOffset = nextOffset;
				}
			}
		}
	}
	async function fetch() {
		isLoading = true;
		await fetchCovers().finally(() => (isLoading = false));
	}
	const interObs = new IntersectionObserver(async (o, s) => {
		if (!isLoading) await fetch();
	});
	let interObsEl: HTMLDivElement | undefined = undefined;
	$: {
		if (interObsEl) {
			interObs.observe(interObsEl);
		}
	}

	onMount(async () => {
		await fetch();
	});
	onDestroy(() => {
		interObs.disconnect();
	});
	$: isDataEmpty = coversData.length == 0;
	$: isInitialLoading = isLoading && isDataEmpty;
</script>

{#if isInitialLoading}
	<div class="init-loading" transition:fade>
		<h3>Loading...</h3>
	</div>
{:else if !isDataEmpty}
	{#if isLoading}
		<div
			class="init-loading"
			transition:slide={{
				axis: "y"
			}}
		>
			<h3>Loading...</h3>
		</div>
	{/if}
	<div class="covers">
		<CoverContents bind:covers={coversData} />
	</div>
	{#if !isAtEnd && !isLoading}
		<div bind:this={interObsEl}></div>
	{/if}
{/if}

<style lang="scss">
	.covers {
		margin-top: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		width: 100%;
	}
</style>
