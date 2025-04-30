<script lang="ts">
	import { type ComponentProps } from "svelte";
	import MangaElementBase1 from "../../base/base1/MangaElementBase1WithReadableCoverImage.svelte";

	interface Events {
		ontitles?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
				id: string;
			}
		) => any;
	}
	interface Props extends Events {
		title: string;
		titles: (ComponentProps<typeof MangaElementBase1> & {
			id: string;
		})[];
	}

	let { title, titles, ontitles }: Props = $props();
</script>

<div class="category">
	<h3>{title}</h3>
	<div class="titles">
		{#each titles as { id, ...props } (id)}
			<MangaElementBase1
				{...props}
				onclick={(detail) => {
					ontitles?.({
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
