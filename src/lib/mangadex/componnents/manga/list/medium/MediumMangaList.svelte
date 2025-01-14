<script lang="ts" module>
	export type MediumMangaListElementProps = ComponentProps<typeof MangaElementBase1> & {
		id: string;
	};
</script>

<script lang="ts">
	import type { ComponentProps } from "svelte";
	import MangaElementBase1 from "../../base/base1/MangaElementBase1WithReadableCoverImage.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	interface Props {
		list?: MediumMangaListElementProps[];
	}

	let { list = [] }: Props = $props();
</script>

<section class="medium">
	{#each list as data}
		<MangaElementBase1
			{...data}
			withFull
			on:click={() => {
				goto(
					route("/mangadex/title/[id]", {
						id: data.id
					})
				);
			}}
		/>
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
