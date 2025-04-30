<script lang="ts">
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		font-family: var(--fonts);
		display: contents;
	}
</style>
