<script lang="ts" module>
	import type { ComponentProps } from "svelte";

	export type LongMangaListItemProps = ComponentProps<typeof MangaElementBase2> & {
		id: string;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { isArray } from "lodash";
	import { flip } from "svelte/animate";
	import MangaElementBase2 from "../../base/base2/MangaElementBase2WithReadableCover.svelte";
	import { crossfade, fade } from "svelte/transition";

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
	const [send, receive] = crossfade({
		fallback: (node) => fade(node)
	});
</script>

<section class="long-list">
	{#each realList as data (`${data.id}`)}
		<span
			animate:flip
			out:send={{
				key: data.id
			}}
			in:receive={{
				key: data.id
			}}
		>
			<MangaElementBase2
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
			/>
		</span>
	{/each}
</section>

<style lang="scss">
	.long-list {
		display: grid;
		gap: 10px;
	}
</style>
