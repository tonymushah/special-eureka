<script lang="ts">
	import { fade } from "svelte/transition";
	import MangaSearchFilterDialogContent from "./MangaSearchFilterDialogContent.svelte";
	import Title from "@mangadex/componnents/theme/texts/title/Title.svelte";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { RiCloseLine } from "svelte-remixicon";

	export let dialog_bind: HTMLDialogElement | undefined = undefined;
</script>

<dialog
	bind:this={dialog_bind}
	on:cancel={(e) => {
		e.currentTarget.close();
	}}
>
	<div class="top">
		<Title type={2}>Search Filters</Title>
		<div class="exit">
			<ButtonAccent
				on:click={() => {
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
	dialog::backdrop {
		backdrop-filter: blur(5px);
		-webkit-backdrop-filter: blur(5px);
	}
</style>
