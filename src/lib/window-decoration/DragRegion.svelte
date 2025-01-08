<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div data-tauri-drag-region>
	{@render children?.()}
</div>

<style lang="scss">
	div {
		transition: background-color 300ms ease-in-out;
		color: var(--textColor);
		background-color: var(--background);
	}
	div:hover {
		background-color: var(--backgroundOnHover);
	}
</style>
