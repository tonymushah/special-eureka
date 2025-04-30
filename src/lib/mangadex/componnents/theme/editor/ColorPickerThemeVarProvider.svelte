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
		display: contents;
		--cp-bg-color: var(--main-background);
		--cp-border-color: var(--mid-tone);
		--cp-text-color: var(--text-color);
		--cp-input-color: var(--accent-l2);
		--cp-button-hover-color: var(--accent-l2-hover);
		--focus-color: var(--primary);
	}
</style>
