<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<span>
	{@render children?.()}
</span>

<style lang="scss">
	span {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--mid-tone);
	}
</style>
