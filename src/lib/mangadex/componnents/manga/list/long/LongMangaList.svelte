<script lang="ts" module>
	import type { ComponentProps } from "svelte";

	export type LongMangaListItemProps = ComponentProps<typeof MangaElementBase2> & {
		id: string;
	};
</script>

<script lang="ts">
	import MangaElementBase2 from "../../base/base2/MangaElementBase2WithReadableCover.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { isArray } from "lodash";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";

	interface Props {
		list?: LongMangaListItemProps[] | LongMangaListItemProps[][];
	}

	let { list = [] }: Props = $props();
	let realList = $derived.by(() => {
		let map = new Map<string, LongMangaListItemProps>();
		list.forEach((mangas) => {
			if (isArray(mangas)) {
				mangas.forEach((manga) => {
					map.set(manga.id, manga);
				});
			} else {
				map.set(mangas.id, mangas);
			}
		});
		return map.values().toArray();
	});
	const [send, receive] = crossfade({});
</script>

<section class="long-list">
	{#each realList as data (`long-manga-element-${data.id}`)}
		<span
			animate:flip
			in:receive={{
				key: `long-manga-element-${data.id}`
			}}
			out:send={{
				key: `long-manga-element-${data.id}`
			}}
			><MangaElementBase2
				{...data}
				onclick={() => {
					goto(
						route("/mangadex/title/[id]", {
							id: data.id
						})
					);
				}}
				ontagClick={(e) => {
					const id = e.id;
					goto(
						route("/mangadex/tag/[id]", {
							id
						})
					);
				}}
				--button-justify-content="start"
			/></span
		>
	{/each}
</section>

<style lang="scss">
	.long-list {
		display: grid;
		gap: 10px;
	}
</style>
