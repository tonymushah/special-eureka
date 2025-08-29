<script lang="ts">
	import { XCircleIcon } from "svelte-feather-icons";
	import ButtonAccent from "./theme/buttons/ButtonAccent.svelte";
	import PrimaryButtonOnlyLabel from "./theme/buttons/PrimaryButtonOnlyLabel.svelte";

	interface Props {
		error: Error;
		label: string;
		retry?: () => any;
		close?: () => any;
	}

	let { error, label, retry, close }: Props = $props();
</script>

<div class="error with-margin">
	<div class="title">
		<h3>{label}</h3>
		{#if retry}
			<div>
				<PrimaryButtonOnlyLabel label="Retry?" onclick={retry} />
			</div>
		{/if}
		{#if close}
			<div>
				<ButtonAccent onclick={close}>
					<div class="icon">
						<XCircleIcon size="20" />
					</div>
				</ButtonAccent>
			</div>
		{/if}
	</div>

	<div class="details">
		<h4>{error.name}</h4>
		<div>{error.message}</div>
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
		.title {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		h3 {
			margin: 0em;
		}
		.details {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			flex-direction: row;
			overflow: hidden;
		}
	}
	.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
