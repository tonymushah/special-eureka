<script lang="ts">
	import type { CombinedError } from "@urql/svelte";

	export let error: CombinedError;
	export let label: string;
</script>

<div class="error with-margin">
	<h3>{label}</h3>
	{#each error.graphQLErrors as { name, message }}
		<div>
			<h4>{name}</h4>
			<p>{message}</p>
		</div>
	{/each}
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
	}
	div.error {
		h3 {
			margin: 0em;
		}
		div {
			display: flex;
			align-items: center;
			justify-self: center;
			gap: 10px;
		}
		background-color: color-mix(in srgb, var(--danger-l1) 50%, var(--main-background) 0%);
		border-left: 10px;
		border-radius: 0.25rem;
		border-color: var(--danger-l2);
		color: var(--text-color);
		padding: 1em;
	}
</style>
