<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonBase
	type="button"
	on:click
	isBase={false}
	noPadding
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l3-active)"}
>
	<article class="layout">
		{@render children?.()}
	</article>
</ButtonBase>

<style lang="scss">
	article.layout {
		width: var(--layout-width);
		display: grid;
		grid-template-areas: "cover content content";
		grid-column-gap: 3;
		grid-row-gap: 1;
		padding-right: 10px;
		height: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 0.25em;
	}
</style>
