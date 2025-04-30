<script lang="ts" module>
	export type TitlePButtonItem = {
		name: string;
		id: string;
	};
</script>

<script lang="ts" generics="T">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
				id: string;
				key: T;
			}
		) => any;
	}
	interface Props extends Events {
		key: T;
		title: string;
		items: TitlePButtonItem[];
	}

	let { key, title, items, onclick }: Props = $props();
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
					onclick={(e) => {
						onclick?.({
							...e,
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
