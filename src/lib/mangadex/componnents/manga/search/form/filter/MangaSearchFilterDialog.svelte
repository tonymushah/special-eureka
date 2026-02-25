<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";

	import MangaSearchFilterDialogContent from "./MangaSearchFilterDialogContent.svelte";
	import { X } from "@lucide/svelte";

	interface Events {
		onvalidate?: (
			ev: MouseEvent & {
				currentTarget: EventTarget & HTMLButtonElement;
			}
		) => unknown;
	}
	interface Props extends Events {
		dialog_bind?: HTMLDialogElement | undefined;
		requireValidation?: boolean;
	}

	let {
		dialog_bind = $bindable(undefined),
		requireValidation = false,
		onvalidate
	}: Props = $props();
</script>

<dialog
	bind:this={dialog_bind}
	oncancel={(e) => {
		e.currentTarget.close();
	}}
>
	<div class="dialog-content">
		<div class="content"></div>
		<div class="top">
			<Title type={2}>Search Filters</Title>
			<div class="exit">
				<ButtonAccent
					onclick={() => {
						dialog_bind?.close();
					}}
				>
					<X size={"24"} />
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
						onvalidate?.(e);
					}}
				>
					<div class="accept-inner">
						<Title type={4}>Accept</Title>
					</div>
				</PrimaryButton>
			</footer>
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		background-color: var(--main-background);
		border-color: var(--mid-tone);
		border-radius: 1em;
		width: 70vw;
	}
	.dialog-content {
		display: flex;
		height: 80vh;
		flex-direction: column;
		gap: 12px;
		main {
			flex-grow: 1;
			overflow-y: scroll;
		}
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
