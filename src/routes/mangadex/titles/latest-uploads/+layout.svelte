<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="content">
	<h1>Latest uploads</h1>
	{@render children?.()}
</div>

<style lang="scss">
	.content {
		margin: 0px 12px;
	}
</style>
