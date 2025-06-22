<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		content: Snippet;
		actions: Snippet;
	}
	let { content, actions }: Props = $props();
</script>

<section>
	<div class="content">
		{@render content()}
	</div>
	<div class="actions">
		{@render actions()}
	</div>
</section>

<style lang="scss">
	section {
		display: flex;
		gap: 12px;
		width: 100%;
		height: 77%;
	}
	.content {
		flex: 1;
		height: 100%;
	}
	.actions {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
</style>
