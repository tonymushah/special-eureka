<script lang="ts">
	interface Props {
		message?: string;
		label: string;
	}

	let { message, label }: Props = $props();
</script>

<div class="error with-margin">
	<h3>{label}</h3>
	{#if message}
		<div class="details">
			<p>{message}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
	}
	div.error {
		border-left: 10px;
		background-color: color-mix(in srgb, var(--danger-l1) 70%, var(--primary-l1) 30%);
		border-radius: 8px;
		border: solid 3px var(--mid-tone);
		box-shadow: 0px 3px 0px var(--mid-tone);
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
