<script lang="ts">
	import { createEventDispatcher, type ComponentProps } from "svelte";
	import MangaElementBase1 from "../../base/base1/MangaElementBase1WithReadableCoverImage.svelte";

	export let title: string;
	export let titles: (ComponentProps<MangaElementBase1> & {
		id: string;
	})[];
	const dispatch = createEventDispatcher<{
		titles: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
		};
	}>();
</script>

<div class="category">
	<h3>{title}</h3>
	<div class="titles">
		{#each titles as { id, ...props } (id)}
			<MangaElementBase1
				{...props}
				on:click={({ detail }) => {
					dispatch("titles", {
						...detail,
						id
					});
				}}
			/>
		{/each}
	</div>
</div>

<style lang="scss">
	.category {
		display: flex;
		flex-direction: column;
		gap: 1px;
		h3 {
			margin: 2px;
			font-family: var(--fonts);
		}
		.titles {
			display: flex;
			flex-direction: row;
			gap: 5px;
			flex-wrap: wrap;
		}
	}
</style>
