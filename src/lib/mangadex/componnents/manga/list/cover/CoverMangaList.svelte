<script lang="ts" module>
	import type { ComponentProps } from "svelte";

	export type CoverMangaListItemProps = ComponentProps<typeof MangaElementBase3> & {
		id: string;
	};
</script>

<script lang="ts">
	import MangaElementBase3 from "../../base/base3/MangaElementBase3WithReadableCoverImage.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { isArray } from "lodash";
	import { crossfade } from "svelte/transition";
	import { flip } from "svelte/animate";

	interface Props {
		list?: CoverMangaListItemProps[] | CoverMangaListItemProps[][];
	}

	let { list = [] }: Props = $props();
	let realList = $derived.by(() => {
		let map = new Map<string, CoverMangaListItemProps>();
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

<section class="cover-list">
	{#each realList as item (`cover-manga-element-${item.id}`)}
		<span
			animate:flip
			in:receive={{ key: `cover-manga-element-${item.id}` }}
			out:send={{ key: `cover-manga-element-${item.id}` }}
		>
			<MangaElementBase3
				{...item}
				onclick={() => {
					goto(
						route("/mangadex/title/[id]", {
							id: item.id
						})
					);
				}}
			/>
		</span>
	{/each}
</section>

<style lang="scss">
	.cover-list {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: stretch;
		gap: 8px;
	}
</style>
