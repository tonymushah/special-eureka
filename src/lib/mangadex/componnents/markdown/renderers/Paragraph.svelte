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
		margin: 0px;
	}
</style>
