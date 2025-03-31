<script lang="ts">
	interface Props {
		isHover: boolean;
		children?: import("svelte").Snippet;
		mangaId: string;
	}

	let { isHover = $bindable(), children, mangaId }: Props = $props();
</script>

<div
	role="article"
	class="layout manga-element"
	onmouseenter={() => {
		isHover = true;
	}}
	onmouseleave={() => {
		isHover = false;
	}}
	data-manga-id={mangaId}
>
	{@render children?.()}
</div>

<style lang="scss">
	.layout {
		width: var(--width);
		height: var(--height);
		overflow: hidden;
		border-radius: 0.25rem;
		color: var(--text-color);
	}
	.manga-element:global([data-selecto-selected]) {
		background-color: color-mix(in srgb, var(--primary) 50%, transparent 50%);
		border-radius: 3px;
		border: 2px solid var(--primary);
	}
</style>
