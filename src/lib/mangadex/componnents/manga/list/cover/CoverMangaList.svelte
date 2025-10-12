<script lang="ts" module>
	import type { ComponentProps } from "svelte";

	export type CoverMangaListItemProps = ComponentProps<typeof MangaElementBase3> & {
		id: string;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { isArray } from "lodash";
	import { flip } from "svelte/animate";
	import MangaElementBase3 from "../../base/base3/MangaElementBase3WithReadableCoverImage.svelte";
	import { crossfade, fade } from "svelte/transition";

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
	const [send, receive] = crossfade({
		fallback: (node) => fade(node)
	});
</script>

<section class="cover-list">
	{#each realList as item (`${item.id}`)}
		<span
			animate:flip
			out:send={{
				key: item.id
			}}
			in:receive={{
				key: item.id
			}}
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
