<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import { createEventDispatcher } from "svelte";
	interface Props {
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { children, mangaId }: Props = $props();

	createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<ButtonBase on:click isBase={false} noPadding --button-color={"var(--main-background)"}>
	<article class="layout manga-element" data-manga-id={mangaId}>
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
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
