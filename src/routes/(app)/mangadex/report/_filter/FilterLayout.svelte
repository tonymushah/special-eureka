<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<section>
	{@render children?.()}
</section>

<style lang="scss">
	section {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		width: 20em;
		column-gap: 8px;
	}
</style>
