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

	interface Props {
		list?: CoverMangaListItemProps[];
	}

	let { list = [] }: Props = $props();
</script>

<section class="cover-list">
	{#each list as item}
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
