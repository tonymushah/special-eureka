<script lang="ts" context="module">
	import type { ComponentProps } from "svelte";

	export type LongMangaListItemProps = ComponentProps<MangaElementBase2> & {
		id: string;
	};
</script>

<script lang="ts">
	import MangaElementBase2 from "../../base/base2/MangaElementBase2WithReadableCover.svelte";
	import { goto } from "$app/navigation";
	import { route } from "$lib/ROUTES";

	export let list: LongMangaListItemProps[] = [];
</script>

<section class="long-list">
	{#each list as data}
		<MangaElementBase2
			{...data}
			on:click={() => {
				goto(
					route("/mangadex/title/[id]", {
						id: data.id
					})
				);
			}}
			on:tagClick={(e) => {
				const id = e.detail.id;
				goto(
					route("/mangadex/tag/[id]", {
						id
					})
				);
			}}
		/>
	{/each}
</section>

<style lang="scss">
	.long-list {
		display: grid;
		gap: 10px;
	}
</style>
