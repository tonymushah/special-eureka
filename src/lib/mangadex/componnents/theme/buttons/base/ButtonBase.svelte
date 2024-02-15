<script lang="ts">
	import { createEventDispatcher } from "svelte";
	export let type: "reset" | "submit" | "button" = "button";
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
	export let with_active: boolean = false;
	export let with_hover: boolean = false;
	export let style: string | undefined = undefined;
	export let isBase = true;
	export let haveBorderRadius = true;
	export let noPadding = false;
</script>

<button
	on:mouseover={(e) => {
		dispatch("mouseover", e);
	}}
	on:focus={(e) => {
		dispatch("focus", e);
	}}
	{style}
	class:isBase
	class:haveBorderRadius
	class:with-active={with_active}
	class:with-hover={with_hover}
	class:noPadding
	on:click={(e) => {
		dispatch("click", e);
	}}
	{type}
>
	<slot />
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
		display: flex;
		align-items: center;
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
