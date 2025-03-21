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

<ButtonBase on:click isBase={false} noPadding --button-color={"var(--main-background)"}>
	<article class="layout">
		{@render children?.()}
	</article>
</ButtonBase>

<style lang="scss">
	.layout {
		width: var(--w-base);
		overflow: hidden;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
	}
</style>
