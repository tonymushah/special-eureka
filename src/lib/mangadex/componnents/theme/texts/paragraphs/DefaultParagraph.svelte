<script lang="ts">
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<p>
	{@render children?.()}
</p>

<style lang="scss">
	p {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--text-color);
	}
</style>
