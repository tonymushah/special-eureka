<script lang="ts" module>
	export type MediumMangaListElementProps = ComponentProps<typeof MangaElementBase1> & {
		id: string;
	};
</script>

<script lang="ts">
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";
	import { isArray } from "lodash";
	import type { ComponentProps } from "svelte";
	import { flip } from "svelte/animate";
	import MangaElementBase1 from "../../base/base1/MangaElementBase1WithReadableCoverImage.svelte";
	import { fade } from "svelte/transition";

	interface Props {
		list?: MediumMangaListElementProps[] | MediumMangaListElementProps[][];
	}

	let { list = [] }: Props = $props();
	let realList = $derived.by(() => {
		let map = new Map<string, MediumMangaListElementProps>();
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
</script>

<section class="medium">
	{#each realList as data (`${data.mangaId}`)}
		<span animate:flip transition:fade>
			<MangaElementBase1
				{...data}
				withFull
				onclick={() => {
					goto(
						route("/mangadex/title/[id]", {
							id: data.id
						})
					);
				}}
			/></span
		>
	{/each}
</section>

<style lang="scss">
	@media (width > 1200px) {
		:root {
			--medium-column: 4;
		}
	}
	@media (850px < width <= 1200px) {
		:root {
			--medium-column: 3;
		}
	}
	@media (550px < width <= 850px) {
		:root {
			--medium-column: 2;
		}
	}
	@media (width <= 550px) {
		:root {
			--medium-column: 1;
		}
	}
	.medium {
		display: grid;
		container-name: list;
		container-type: initial;
		gap: 10px;
		grid-template-columns: repeat(var(--medium-column), calc(98% / var(--medium-column)));
	}
</style>
