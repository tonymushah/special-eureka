<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { XIcon as CloseIcon } from "svelte-feather-icons";

	interface Props {
		dialog: HTMLDialogElement | undefined;
		selectedMangas: string[];
		selectedChapters: string[];
	}
	let { dialog = $bindable(undefined), selectedChapters, selectedMangas }: Props = $props();
	function closeDialog() {
		if (dialog) {
			dialog.close();
		}
	}
	let chaptersLen = $derived(selectedChapters.length);
	let chaptersEmpty = $derived(chaptersLen == 0);

	let mangasLen = $derived(selectedMangas.length);
	let mangasEmpty = $derived(mangasLen == 0);
</script>

<dialog bind:this={dialog}>
	<div class="title">
		<p>
			You have selected {mangasLen} title{#if mangasLen > 1}s{/if} and {chaptersLen} chapter{#if chaptersLen > 1}s{/if}.
		</p>
		<ButtonAccent on:click={closeDialog}>
			<CloseIcon />
		</ButtonAccent>
	</div>
	<div class="body"></div>
</dialog>

<style lang="scss">
	dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 75vw;
		border: 2px solid var(--primary);
		border-radius: 3px;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
	.title {
		justify-content: space-between;
		display: flex;
		p {
			margin: 0px;
			font-weight: 800;
			font-size: large;
		}
	}
</style>
