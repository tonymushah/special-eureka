<script lang="ts">
	import { MenuIcon } from "svelte-feather-icons";
	import { isDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import { fade } from "svelte/transition";

	const open = isDrawerOpenWritable();

	export let left = false;
</script>

<button
	class:left
	on:click={() => {
		$open = !$open;
	}}
	transition:fade
>
	<MenuIcon />
</button>

<style lang="scss">
	button {
		right: 0;
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-l1);
		opacity: 0.4;
		transition:
			opacity 200ms ease-in-out,
			background-color 200ms ease-in-out;
		border: 1px;
		border-radius: 0.25em;
		z-index: 10;
	}
	button.left {
		left: 0;
	}
	button:hover {
		background-color: color-mix(in srgb, var(--primary-l1) 70%, transparent 30%);
		opacity: 1;
	}
	button:active {
		background-color: color-mix(in srgb, var(--primary-l1) 60%, transparent 40%);
	}
</style>
