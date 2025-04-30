<script lang="ts">
	import { fade } from "svelte/transition";
	import MangaSearchFilterDialogContent from "./MangaSearchFilterDialogContent.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { RiCloseLine } from "svelte-remixicon";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { createEventDispatcher } from "svelte";

	interface Props {
		dialog_bind?: HTMLDialogElement | undefined;
		requireValidation?: boolean;
	}

	let { dialog_bind = $bindable(undefined), requireValidation = false }: Props = $props();
	const dispatch = createEventDispatcher<{
		validate: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		};
	}>();
</script>

<dialog
	bind:this={dialog_bind}
	oncancel={(e) => {
		e.currentTarget.close();
	}}
>
	<div class="top">
		<Title type={2}>Search Filters</Title>
		<div class="exit">
			<ButtonAccent
				onclick={() => {
					dialog_bind?.close();
				}}
			>
				<RiCloseLine size={"24"} />
			</ButtonAccent>
		</div>
	</div>
	<main>
		<MangaSearchFilterDialogContent />
	</main>
	{#if requireValidation}
		<footer>
			<PrimaryButton
				onclick={(e) => {
					dispatch("validate", e);
				}}
			>
				<div class="accept-inner">
					<Title type={4}>Accept</Title>
				</div>
			</PrimaryButton>
		</footer>
	{/if}
</dialog>

<style lang="scss">
	dialog {
		background-color: var(--main-background);
		border-color: var(--mid-tone);
		border-radius: 1em;
		width: 70vw;
		height: 80vh;
	}
	.top {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.exit {
			display: flex;
		}
	}
	footer {
		margin-top: 10px;
		display: flex;
		justify-content: right;
	}
	.accept-inner {
		--padding-x: 8px;
		--padding-y: 4px;
		padding-left: var(--padding-x);
		padding-right: var(--padding-x);
		padding-bottom: var(--padding-y);
		padding-top: var(--padding-y);
	}
	dialog::backdrop {
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
