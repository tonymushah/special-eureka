<script lang="ts" module>
	export type TitlePButtonItem = {
		name: string;
		id: string;
	};
</script>

<script lang="ts" generics="T">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";

	interface Props {
		key: T;
		title: string;
		items: TitlePButtonItem[];
	}

	let { key, title, items }: Props = $props();
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
					onclick={({ detail }) => {
						dispatch("click", {
							...detail,
							key,
							id
						});
					}}
				>
					<p>
						{name}
					</p>
				</ButtonBase>
			{/each}
		</div>
	</div>
{/if}

<style lang="scss">
	p {
		margin: 1px;
	}
	h4 {
		margin: 1px;
		padding: 0px;
		font-weight: 800;
	}
	.outer {
		display: flex;
		flex-direction: column;
		.inner {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 5px;
		}
	}
</style>
