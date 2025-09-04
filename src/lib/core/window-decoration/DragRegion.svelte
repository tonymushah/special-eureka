<script lang="ts">
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	data-tauri-drag-region
	oncontextmenu={(e) => {
		e.preventDefault();
		e.stopPropagation();
	}}
>
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
