<script lang="ts">
	import { MenuIcon } from "svelte-feather-icons";
	import { isDrawerOpenWritable } from "../contexts/isDrawerOpen";
	import { fade } from "svelte/transition";

	const open = isDrawerOpenWritable();

	export let left = false;
</script>

<section class:left>
	<button
		on:click={() => {
			$open = !$open;
		}}
		transition:fade
	>
		<MenuIcon />
	</button>
</section>

<style lang="scss">
	section {
		z-index: 10;
		position: absolute;
		transition:
			opacity 200ms ease-in-out,
			background-color 200ms ease-in-out;
	}
	section:not(.left) {
		right: 0;
	}
	section.left {
		left: 0;
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: var(--primary-l1);
		opacity: 0.4;

		border: 1px;
		border-radius: 0.25em;
	}

	button:hover {
		background-color: color-mix(in srgb, var(--primary-l1) 70%, transparent 30%);
		opacity: 1;
	}
	button:active {
		background-color: color-mix(in srgb, var(--primary-l1) 60%, transparent 40%);
	}
</style>
