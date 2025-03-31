<script lang="ts">
	import { getTitleLayoutData } from "@mangadex/routes/title/[id]/layout.context";
	import get_cover_art from "@mangadex/utils/cover-art/get_cover_art";
	import { getContextClient } from "@urql/svelte";
	import { onDestroy, onMount } from "svelte";
	import { fade, slide } from "svelte/transition";
	import type { CoverInput } from "./CoverContents.svelte";
	import CoverContents from "./CoverContents__.svelte";
	import { getCoversImageStoreContext } from "./utils/coverImageStoreContext";
	import getMangaCoversQuery from "./utils/query";
	import { debounce, type DebouncedFunc } from "lodash";
	import { get, writable, derived as der } from "svelte/store";

	const d = getTitleLayoutData();
	const data = d.layoutData;
	const id = data!.id;
	const client = getContextClient();
	const imagesStore = getCoversImageStoreContext();
	const isLoading = writable(false);
	const currentOffset = writable(0);
	const isAtEnd = writable(false);
	const coversData = writable<CoverInput[]>([]);
	const fetchCovers = debounce(async function () {
		if (get(isAtEnd)) {
			throw new Error("No next data can be fetched");
		}
		console.debug("run");
		const res = await client
			.query(getMangaCoversQuery, {
				id,
				offset: get(currentOffset)
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
				if (get(currentOffset) == 0) {
					coversData.set(covers);
				} else {
					coversData.update((cs) => {
						cs.push(...covers);
						return cs;
					});
				}
				const nextOffset = get(currentOffset) + list.limit;
				if (nextOffset >= list.total) {
					isAtEnd.set(true);
				} else {
					currentOffset.set(nextOffset);
				}
			}
		}
	}, 300);
	async function fetch() {
		if (!get(isLoading) && !get(isAtEnd)) {
			isLoading.set(true);
			if (fetchCovers) {
				const res = fetchCovers();
				try {
					if (res != undefined) {
						await res;
					}
				} finally {
					isLoading.set(false);
				}
			}
		}
	}
	onMount(async () => {
		await fetch();
	});
	const interObs = new IntersectionObserver(async (o, s) => {
		o.forEach((_o) => {
			if (_o.isIntersecting) {
				fetch();
			}
		});
	});
	let interObsEl: HTMLDivElement | undefined = $state(undefined);
	$effect.pre(() => {
		if (interObsEl) {
			interObs.observe(interObsEl);
		}
	});

	onDestroy(() => {
		interObs.disconnect();
	});
	const isDataEmpty = der(coversData, ($coversData) => $coversData.length == 0);
	const isInitialLoading = der(
		[isLoading, isDataEmpty],
		([isLoading, isDataEmpty]) => isLoading && isDataEmpty
	);
</script>

<CoverContents {isDataEmpty} {isLoading} {isInitialLoading} {coversData} />
<div bind:this={interObsEl}></div>
