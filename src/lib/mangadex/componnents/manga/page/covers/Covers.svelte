<script lang="ts">
	import { run } from "svelte/legacy";

	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy, onMount } from "svelte";
	import { fade, slide } from "svelte/transition";
	import type { CoverInput } from "./CoverContents.svelte";
	import CoverContents from "./CoverContents.svelte";
	import { getCoversImageStoreContext } from "./utils/coverImageStoreContext";
	import getMangaCoversQuery from "./utils/query";

	const { layoutData: data } = getTitleLayoutData();
	const id = data!.id;
	const client = getContextClient();
	const imagesStore = getCoversImageStoreContext();
	let isLoading = $state(false);
	let currentOffset = 0;
	let isAtEnd = $state(false);
	let coversData: CoverInput[] = $state([]);
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
	let interObsEl: HTMLDivElement | undefined = $state(undefined);
	run(() => {
		if (interObsEl) {
			interObs.observe(interObsEl);
		}
	});

	onMount(async () => {
		await fetch();
	});
	onDestroy(() => {
		interObs.disconnect();
	});
	let isDataEmpty = $derived(coversData.length == 0);
	let isInitialLoading = $derived(isLoading && isDataEmpty);
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
	<article class="covers">
		<CoverContents bind:covers={coversData} />
	</article>
	{#if !isAtEnd && !isLoading}
		<div bind:this={interObsEl}></div>
	{/if}
{/if}

<style lang="scss">
	.covers {
		margin-top: 10px;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
		width: 100%;
		gap: 10px;
	}
</style>
