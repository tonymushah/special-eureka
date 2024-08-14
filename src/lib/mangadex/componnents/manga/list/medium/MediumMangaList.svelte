<script lang="ts" context="module">
	export type MediumMangaListElementProps = ComponentProps<MangaElementBase1> & {
		id: string;
	};
</script>

<script lang="ts">
	import type { ComponentProps } from "svelte";
	import MangaElementBase1 from "../../base/base1/MangaElementBase1WithReadableCoverImage.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	export let list: MediumMangaListElementProps[] = [];
</script>

<section class="medium">
	{#each list as data}
		<MangaElementBase1
			{...data}
			withFull
			on:click={() => {
				goto(
					route("/mangadex/list/[id]", {
						id: data.id
					})
				);
			}}
		/>
	{/each}
</section>

<style lang="scss">
	@media (width > 1200px) {
		.medium {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@media (850px < width <= 1200px) {
		.medium {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (550px < width <= 850px) {
		.medium {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	.medium {
		display: grid;
		container-name: list;
		container-type: initial;
		gap: 10px;
	}
</style>
