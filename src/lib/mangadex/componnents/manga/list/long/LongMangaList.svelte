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

	interface Props {
		list?: LongMangaListItemProps[];
	}

	let { list = [] }: Props = $props();
</script>

<section class="long-list">
	{#each list as data}
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
	{/each}
</section>

<style lang="scss">
	.long-list {
		display: grid;
		gap: 10px;
	}
</style>
