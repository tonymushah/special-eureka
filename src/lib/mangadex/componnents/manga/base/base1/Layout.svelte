<script lang="ts">
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";

	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			},
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
<button
	onclick={(e) => {
		onclick?.(e);
	}}
	class="layout manga-element"
	data-manga-id={mangaId}
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true,
	})}
>
	{@render children?.()}
</button>

<style lang="scss">
	.layout {
		--shadow-color: var(--mid-tone);
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
		box-shadow: 0px 4px 0px var(--shadow-color);
		column-gap: 10px;
		color: inherit;
		font-family: inherit;
		padding: 0px;
		transform: translateY(-4px);
	}
	@media (width < 900px) {
		.layout {
			grid-template-columns: 90px auto;
		}
	}
	@media (width >= 900px) {
		.layout {
			grid-template-columns: 100px auto;
		}
	}
	.layout:focus {
		outline: none;
		border-color: var(--contrast-l1);
		--shadow-color: var(--contrast-l1);
	}
	.layout:hover {
		background-color: var(--accent-l3-hover);
	}
	.layout:active {
		background-color: var(--accent-l3-active);
		box-shadow: none;
		transform: translateY(0px);
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(
			in srgb,
			var(--primary) 50%,
			transparent 50%
		);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
