<script lang="ts">
	import { createEventDispatcher } from "svelte";
	const dispatch = createEventDispatcher<{
		click: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		mouseover: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
		focus: FocusEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
	interface Props {
		type?: "reset" | "submit" | "button";
		with_active?: boolean;
		with_hover?: boolean;
		style?: string | undefined;
		isBase?: boolean;
		haveBorderRadius?: boolean;
		noPadding?: boolean;
		children?: import('svelte').Snippet;
	}

	let {
		type = "button",
		with_active = false,
		with_hover = false,
		style = undefined,
		isBase = false,
		haveBorderRadius = true,
		noPadding = false,
		children
	}: Props = $props();
</script>

<button
	onmouseover={(e) => {
		dispatch("mouseover", e);
	}}
	onfocus={(e) => {
		dispatch("focus", e);
	}}
	{style}
	class:isBase
	class:haveBorderRadius
	class:with-active={with_active}
	class:with-hover={with_hover}
	class:noPadding
	onclick={(e) => {
		dispatch("click", e);
	}}
	{type}
>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		font-size: var(--font-size);
		transition:
			background-color 200ms ease-in-out,
			filter 200ms ease-in-out;
		color: var(--text-color);
		background-color: var(--button-color);
		font-family: var(--fonts);
		border: 0;
		display: var(--button-display);
		align-items: var(--button-align-items);
		justify-content: var(--button-justify-content);
	}
	button.haveBorderRadius {
		border-radius: 0.25rem;
	}
	button.noPadding {
		padding: 0px;
	}
	button.isBase {
		border-color: var(--button-active);
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
