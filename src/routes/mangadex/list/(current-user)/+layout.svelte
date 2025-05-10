<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="container">
	<h1>Your Mangadex Custom Lists</h1>

	{@render children?.()}
</div>

<style lang="scss">
	.container {
		margin: 0px 10px;
	}
</style>
