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

<div class="outer">
	<h4>{title}</h4>
	<div class="inner">
		{#each items as { id, name } (id)}
			<ButtonBase
				with_active
				with_hover
				--button-color="var(--accent-l2)"
				--button-hover="var(--primary)"
				--button-active="var(--primary-l1)"
				on:click={({ detail }) => {
					dispatch("click", {
						...detail,
						key,
						id
					});
				}}
			>
				{name}
			</ButtonBase>
		{/each}
	</div>
</div>

<style lang="scss">
	.outer {
		display: flex;
		flex-direction: row;
	}
	.inner {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}
</style>
