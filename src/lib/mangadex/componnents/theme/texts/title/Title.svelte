<script lang="ts">
	interface Props {
		type?: 1 | 2 | 3 | 4 | 5 | 6;
		children?: import("svelte").Snippet;
	}

	let { type = 2, children }: Props = $props();
</script>

{#if type == 1}
	<h1 class="title">
		{@render children?.()}
	</h1>
{:else if type == 2}
	<h2 class="title">
		{@render children?.()}
	</h2>
{:else if type == 3}
	<h3 class="title">
		{@render children?.()}
	</h3>
{:else if type == 4}
	<h4 class="title">
		{@render children?.()}
	</h4>
{:else if type == 5}
	<h5 class="title">
		{@render children?.()}
	</h5>
{:else if type == 6}
	<h6 class="title">
		{@render children?.()}
	</h6>
{/if}

<style lang="scss">
	.title {
		color: var(--text-color);
		font-family: var(--fonts);
		margin: var(--title-margin);
	}
</style>
