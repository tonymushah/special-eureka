<script lang="ts">
	export let type: 1 | 2 | 3 | 4 | 5 | 6 = 2;
</script>

{#if type == 1}
	<h1 class="title">
		<slot />
	</h1>
{:else if type == 2}
	<h2 class="title">
		<slot />
	</h2>
{:else if type == 3}
	<h3 class="title">
		<slot />
	</h3>
{:else if type == 4}
	<h4 class="title">
		<slot />
	</h4>
{:else if type == 5}
	<h5 class="title">
		<slot />
	</h5>
{:else if type == 6}
	<h6 class="title">
		<slot />
	</h6>
{/if}

<style lang="scss">
	.title {
		color: var(--text-color);
		font-family: var(--fonts);
	}
</style>
