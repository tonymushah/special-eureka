<script lang="ts">
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
		mangaId: string;
		children?: import("svelte").Snippet;
	}

	let { children, mangaId, onclick }: Props = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<article
	onclick={(e) => {
		onclick?.(e);
	}}
	class="layout manga-element"
	data-manga-id={mangaId}
>
	{@render children?.()}
</article>

<style lang="scss">
	article.layout {
		width: var(--layout-width);
		display: grid;
		grid-template-areas: "cover content";
		height: 160px;
		overflow: hidden;
		text-overflow: ellipsis;
		border-radius: 0.25em;
		transition:
			background-color,
			filter 200ms ease-in-out;
		background-color: var(--accent-l3);
		border: var(--mid-tone) solid 3px;
		box-shadow: 0px 3px 0px var(--mid-tone);
		column-gap: 10px;
	}
	@media (width < 900px) {
		article.layout {
			grid-template-columns: 90px auto;
		}
	}
	@media (width >= 900px) {
		article.layout {
			grid-template-columns: 100px auto;
		}
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
