<script lang="ts">
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="layout">
	{@render children?.()}
</div>

<style lang="scss">
	.layout {
		margin: 8px 16px;
		width: 95%;
	}
</style>
