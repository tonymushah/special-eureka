<script lang="ts">
	import { emptyMeltElement, melt, type AnyMeltElement } from "@melt-ui/svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	interface Props extends HTMLButtonAttributes {
		with_active?: boolean;
		with_hover?: boolean;
		isBase?: boolean;
		haveBorderRadius?: boolean;
		noPadding?: boolean;
		children?: import("svelte").Snippet;
		meltElement?: AnyMeltElement;
	}

	let {
		type = "button",
		with_active = false,
		with_hover = false,
		style = undefined,
		isBase = false,
		haveBorderRadius = true,
		noPadding = false,
		children,
		meltElement = emptyMeltElement,
		...restProps
	}: Props = $props();
</script>

<button
	{style}
	class:isBase
	class:haveBorderRadius
	class:with-active={with_active}
	class:with-hover={with_hover}
	class:noPadding
	use:melt={$meltElement}
	{...restProps}
>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		font-size: var(--font-size);
		transition:
			background-color,
			filter 100ms ease-in-out;
		color: var(--text-color);
		background-color: var(--button-color);
		font-family: var(--fonts);
		border: var(--mid-tone) solid 3px;
		box-shadow: 0px 3px 0px var(--mid-tone);
		display: var(--button-display);
		align-items: var(--button-align-items);
		justify-content: var(--button-justify-content);
		transform: translateY(-3px);
	}
	button:disabled {
		background: linear-gradient(
			225deg,
			color-mix(in srgb, var(--main-background) 95%, var(--danger, transparent) 5%) 0%,
			var(--button-color) 100%
		);
	}
	button:hover:disabled {
		background: linear-gradient(
			45deg,
			color-mix(in srgb, var(--main-background) 95%, var(--danger, transparent) 05%) 0% 0%,
			var(--button-color) 100%
		);
	}
	button.haveBorderRadius {
		border-radius: 0.25rem;
	}
	button.noPadding {
		padding: 0px;
	}
	button.isBase {
		border-color: var(--button-active, var(--mid-tone));
		box-shadow: 0px 3px 0px var(--button-active, var(--mid-tone));
		min-height: 3em;
		min-width: 3em;
		padding-left: 0.75rem;
		padding-right: 0.75rem;
	}
	button.with-hover:hover {
		background-color: var(--button-hover);
	}
	button:hover {
		cursor: pointer;
	}
	button:active {
		box-shadow: none;
		transform: translateY(0px);
	}
	button.with-active:active {
		background-color: var(--button-active);
	}
	button:not(.with-hover):hover {
		filter: brightness(85%);
	}
	button:not(.with-active):active {
		filter: brightness(70%);
	}
</style>
