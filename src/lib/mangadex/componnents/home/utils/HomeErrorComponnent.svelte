<script lang="ts">
	import { CombinedError } from "@urql/svelte";

	interface Props {
		error: Error;
		label: string;
	}

	let { error, label }: Props = $props();
</script>

<div class="error with-margin">
	<h3>{label}</h3>
	{#if error instanceof CombinedError}
		{#each error.graphQLErrors as { name, message }}
			<div class="details">
				<h4>{name}</h4>
				<div>{message}</div>
			</div>
		{/each}
	{:else}
		<div class="details">
			<h4>{error.name}</h4>
			<div>{error.message}</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
	}
	div.error {
		background-color: color-mix(in srgb, var(--danger-l1) 50%, var(--main-background) 0%);
		border-left: 10px;
		background-color: color-mix(in srgb, var(--danger) 70%, transparent 30%);
		border-radius: 8px;
		border: solid 3px var(--mid-tone);
		box-shadow: 0px 1px 0px var(--mid-tone);
		color: var(--text-color);
		padding: 1em;
		h3 {
			margin: 0em;
		}
		.details {
			display: flex;
			align-items: center;
			justify-self: center;
			gap: 10px;
			flex-direction: row;
			overflow: hidden;
		}
	}
</style>
