<script lang="ts">
	import ButtonBase from "@mangadex/componnents/theme/buttons/base/ButtonBase.svelte";
	import SomeDiv from "@mangadex/componnents/theme/SomeDiv.svelte";
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

<!-- TODO Remove <ButtonBase/> for layout -->
<SomeDiv
	--button-color={"var(--accent-l3)"}
	--button-hover={"var(--accent-l3-hover)"}
	--button-active={"var(--accent-l-active)"}
>
	<button
		class="layout manga-element"
		data-manga-id={mangaId}
		{onclick}
		oncontextmenu={registerContextMenuEvent({
			preventDefault: true
		})}
	>
		{@render children?.()}
	</button>
</SomeDiv>

<style lang="scss">
	.layout {
		width: var(--element-w);
		height: var(--element-h);
		overflow: hidden;
		border-radius: 0.25rem;
	}
	button {
		font-size: var(--font-size);
		transition:
			background-color,
			filter 100ms ease-in-out;
		color: var(--text-color);
		background-color: var(--button-color);
		font-family: var(--fonts);
		border: var(--mid-tone) solid 3px;
		padding: 0px;
	}
	button:hover {
		background-color: var(--button-hover);
		box-shadow: 0px 3px 0px var(--mid-tone);
		cursor: pointer;
		transform: translateY(-3px);
	}
	button:hover:disabled {
		background: linear-gradient(
			45deg,
			color-mix(in srgb, var(--main-background) 95%, var(--danger, transparent) 05%) 0% 0%,
			var(--button-color) 100%
		);
	}
	button:active {
		box-shadow: none;
		transform: translateY(0px);
		filter: brightness(75%);
	}
	.manga-element:global([data-selecto-selected]) {
		--content-bg: color-mix(in srgb, var(--primary) 75%, var(--accent-l3) 25%);
	}
	.manga-element:global(:not([data-selecto-selected])) {
		--content-bg: var(--accent-l3);
	}
</style>
