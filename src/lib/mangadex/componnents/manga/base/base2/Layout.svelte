<script lang="ts">
	import { createEventDispatcher } from "svelte";
	interface Props {
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { children, mangaId }: Props = $props();

	const dispatcher = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLElement;
		};
	}>();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
	onclick={(e) => {
		dispatcher("click", e);
	}}
	class="layout manga-element"
	data-manga-id={mangaId}
>
	{@render children?.()}
</article>

<style lang="scss">
	article.layout {
		min-width: 10em;
		max-height: var(--max-height);
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: 0.25rem;
		border-radius: 0.25em;
		transition:
			background-color,
			filter 200ms ease-in-out;
		background-color: var(--accent-l3);
		border: var(--mid-tone) solid 3px;
		box-shadow: 0px 3px 0px var(--mid-tone);
	}
	article.layout:hover {
		background-color: var(--accent-l3-hover);
	}
	article.layout:active {
		background-color: var(--accent-l3-active);
		box-shadow: none;
		transform: translateY(3px);
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
