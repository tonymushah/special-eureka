<script lang="ts">
	import PrimaryButtonOnlyLabel from "./theme/buttons/PrimaryButtonOnlyLabel.svelte";

	interface Props {
		error: Error;
		label: string;
		retry?: () => any;
	}

	let { error, label, retry }: Props = $props();
</script>

<div class="error with-margin">
	<h3>{label}</h3>
	<div class="details">
		<h4>{error.name}</h4>
		<div>{error.message}</div>
		{#if retry}
			<div>
				<PrimaryButtonOnlyLabel label="Retry?" onclick={retry} />
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.with-margin {
		margin-left: 1em;
		margin-right: 1em;
	}
	div.error {
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
