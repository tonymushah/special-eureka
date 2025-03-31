<script lang="ts">
	import { fade } from "svelte/transition";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div transition:fade>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		display: grid;
	}
</style>
