<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	interface Events {
		onclick?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLElement;
			}
		) => any;
	}
	interface Props extends Events {
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { children, mangaId, onclick }: Props = $props();
</script>

<button
	class="layout manga-element"
	data-manga-id={mangaId}
	oncontextmenu={registerContextMenuEvent({
		preventDefault: true
	})}
	{onclick}
>
	{@render children?.()}
</button>

<style lang="scss">
	.layout {
		width: var(--w-base);
		overflow: hidden;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
	}
	button {
		font-size: var(--font-size);
		transition:
			background-color,
			filter 100ms ease-in-out;
		color: var(--text-color);
		background-color: var(--main-background);
		font-family: var(--fonts);
		border: var(--mid-tone) solid 3px;
		padding: 0px;
	}
	button:hover {
		box-shadow: 0px 3px 0px var(--mid-tone);
		cursor: pointer;
		transform: translateY(-3px);
	}
	button:hover:disabled {
		background: linear-gradient(
			45deg,
			color-mix(in srgb, var(--main-background) 95%, var(--danger, transparent) 05%) 0% 0%,
			var(--mid-tone) 100%
		);
	}
	button:active {
		box-shadow: none;
		transform: translateY(0px);
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
