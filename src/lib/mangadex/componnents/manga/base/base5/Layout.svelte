<script lang="ts">
	interface Props {
		isHover: boolean;
		children?: import('svelte').Snippet;
	}

	let { isHover = $bindable(), children }: Props = $props();
</script>

<div
	role="article"
	class="layout"
	onmouseenter={() => {
		isHover = true;
	}}
	onmouseleave={() => {
		isHover = false;
	}}
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
</style>
