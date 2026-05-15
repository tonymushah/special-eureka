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
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { children, mangaId, onclick }: Props = $props();
</script>

<button
	{onclick}
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
		min-width: 10em;
		max-height: var(--max-height);
		display: flex;
		flex-direction: row;
		overflow-y: hidden;
		border-radius: var(--radius-sm);
		transition:
			background-color,
			filter 200ms ease-in-out;
		background-color: var(--accent-l3);
		border: var(--mid-tone) solid 3px;
		color: inherit;
		font-family: inherit;
		padding: 0px;
	}
	.layout:focus {
		outline: none;
		border-color: var(--contrast-l1);
		--shadow-color: var(--contrast-l1);
	}
	.layout:hover {
		background-color: var(--accent-l3-hover);
		/* box-shadow: 0px 4px 0px var(--shadow-color); */
		/* transform: translateY(-4px); */
	}
	.layout:active {
		background-color: var(--accent-l3-active);
		/* box-shadow: none; */
		/* transform: translateY(0px); */
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
