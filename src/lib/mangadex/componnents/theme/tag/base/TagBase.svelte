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
		--shadow-border: var(--mid-tone);
		/* transition: background-color 300ms ease-in-out; */
		font-size: var(--tag-font-size);
		font-weight: var(--tag-font-weight);
		background-color: var(--tag-color);
		color: var(--text-color);
		font-family: var(--fonts);
		padding: var(--tag-padding);
		border-radius: var(--radius-md);
		border: 1px solid var(--shadow-border);
		box-shadow: 0px 3px 0px var(--shadow-border);
		transform: translateY(0px);
	}
	button:hover {
		background-color: color-mix(
			in srgb,
			var(--tag-color) 75%,
			transparent 25%
		);
		cursor: pointer;
	}
	button:active {
		background-color: color-mix(
			in srgb,
			var(--tag-color) 55%,
			transparent 45%
		);
		box-shadow: none;
		transform: translateY(3px);
	}
	button:focus {
		outline: none;
		--shadow-border: var(--contrast-l1);
	}
	button:disabled {
		box-shadow: none;
		transform: translateY(3px);
		cursor: not-allowed;
		--shadow-border: var(--mid-tone);
	}
</style>
