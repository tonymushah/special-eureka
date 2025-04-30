<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	interface Props extends HTMLButtonAttributes {}

	let { children, ...restProps }: Props = $props();
</script>

<button {...restProps}>
	{@render children?.()}
</button>

<style lang="scss">
	button {
		transition: background-color 300ms ease-in-out;
		font-size: var(--tag-font-size);
		font-weight: var(--tag-font-weight);
		background-color: var(--tag-color);
		color: var(--text-color);
		font-family: var(--fonts);
		padding: var(--tag-padding);
		border: 0px;
		border-radius: 0.25em;
	}
	button:hover {
		background-color: color-mix(in srgb, var(--tag-color) 75%, transparent 25%);
	}
	button:active {
		background-color: color-mix(in srgb, var(--tag-color) 55%, transparent 45%);
	}
</style>
