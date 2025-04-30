<script lang="ts">
	interface Props {
		type?: "blue";
		children?: import("svelte").Snippet;
	}

	let { type = "blue", children }: Props = $props();
	let blue = $derived(type == "blue");
</script>

<p class:blue>
	{@render children?.()}
</p>

<style lang="scss">
	p {
		font-size: var(--font-size);
		font-family: var(--fonts);
		color: var(--text-color);
	}
	.blue {
		color: var(--indication-blue);
	}
</style>
