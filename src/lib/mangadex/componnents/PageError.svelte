<script lang="ts">
	import { slide } from "svelte/transition";
	import PrimaryButton from "./theme/buttons/PrimaryButton.svelte";
	import { ArrowLeftIcon, RefreshCcwIcon } from "svelte-feather-icons";
	import ButtonAccent from "./theme/buttons/ButtonAccent.svelte";
	let isTitleHovered = $state(false);
	interface Props {
		message?: string | undefined;
	}

	let { message = undefined }: Props = $props();
</script>

<div class="error">
	<h2
		onmouseenter={() => {
			isTitleHovered = true;
		}}
		onmouseleave={() => {
			isTitleHovered = false;
		}}
	>
		Oops, something is not working as intended
	</h2>
	{#if isTitleHovered}
		<p class="tony-message" transition:slide>Tony Mushah: Pardon me for that ��</p>
	{/if}

	{#if message}
		<div class="message" transition:slide>
			<p>{message}</p>
		</div>
	{/if}
	<div class="buttons">
		<PrimaryButton
			isBase
			on:click={() => {
				history.back();
			}}
		>
			<h3>
				<ArrowLeftIcon />
				Previous Page
			</h3>
		</PrimaryButton>
		<ButtonAccent
			isBase
			on:click={() => {
				location.reload();
			}}
		>
			<h3>
				<RefreshCcwIcon />
				Refresh
			</h3>
		</ButtonAccent>
	</div>
</div>

<style lang="scss">
	.error {
		display: flex;
		height: -webkit-fill-available;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		flex-wrap: nowrap;
		background-color: color-mix(in srgb, var(--danger-l1) 50%, transparent 50%);
		h2 {
			margin: 0px;
		}
	}
	.buttons {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 8px;
		h3 {
			margin: 0px;
			display: flex;
			align-items: center;
			gap: 12px;
		}
	}
	.message {
		width: 90%;
		p {
			text-align: center;
		}
	}
</style>
