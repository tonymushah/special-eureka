<script lang="ts">
	import { melt, type AnyMeltElement } from "@melt-ui/svelte";
	import type { Snippet } from "svelte";
	import type { Writable } from "svelte/store";
	interface Props {
		id: string;
		title: string;
		value: Writable<string>;
		children?: Snippet;
		disabled?: boolean;
	}
	let { id, title, value, children, disabled }: Props = $props();
</script>

<button
	onclick={() => {
		value.set(id);
	}}
	{disabled}
	data-state={$value == id ? "active" : "inactive"}
>
	{title}
	{@render children?.()}
</button>

<style lang="scss">
	button {
		color: var(--text-color);
		font-family: var(--fonts);
		background-color: transparent;
		padding: 5px 10px;
		font-size: var(--button-font-size, medium);
		border: 3px solid var(--mid-tone);
		border-radius: 3px;
		transition:
			box-shadow,
			transform 250ms ease-in-out;
	}
	button:disabled {
		background-color: color-mix(in srgb, var(--mid-tone) 50%, transparent 50%);
		opacity: 0.5;
	}
	button:global([data-state="active"]) {
		box-shadow: 0px 3px 0px var(--mid-tone);
		transform: translateY(-3px);
		background-color: color-mix(in srgb, var(--accent-l5) 50%, transparent 50%);
	}
</style>
