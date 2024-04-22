<script lang="ts" context="module">
	export type TitlePButtonItem = {
		name: string;
		id: string;
	};
</script>

<script lang="ts" generics="T">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	export let key: T;
	export let title: string;
	export let items: TitlePButtonItem[];
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
			id: string;
			key: T;
		};
	}>();
</script>

{#if items.length > 0}
	<div class="outer">
		<h4>{title}</h4>
		<div class="inner">
			{#each items as { id, name } (id)}
				<ButtonBase
					with_hover
					--button-color="var(--accent)"
					--button-hover="var(--primary)"
					on:click={({ detail }) => {
						dispatch("click", {
							...detail,
							key,
							id
						});
					}}
				>
					<h4>
						{name}
					</h4>
				</ButtonBase>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	h4 {
		margin: 1px;
		padding: 0px;
	}
	.outer {
		display: flex;
		flex-direction: column;
		.inner {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 5px;
			h4 {
				margin: 2px;
			}
		}
	}
</style>
