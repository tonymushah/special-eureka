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
	on:click
	isBase={false}
	noPadding
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l-active)"}
>
	<article class="layout">
		{@render children?.()}
	</article>
</ButtonBase>

<style lang="scss">
	article.layout {
		min-width: 10em;
		max-height: var(--max-height);
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: 0.25rem;
	}
</style>
