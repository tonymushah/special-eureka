<script lang="ts">
	import Skeleton from "@mangadex/componnents/theme/loader/Skeleton.svelte";
	import { getTopCoverAltContextStore, getTopCoverContextStore } from "./context";
	let dialog_: HTMLDialogElement | undefined = undefined;
	const coverImageStore = getTopCoverContextStore();
	$: coverImage = $coverImageStore;
	const alt = getTopCoverAltContextStore();
</script>

{#if coverImage}
	<div
		tabindex="0"
		role="button"
		class="show-dialog"
		on:keydown={() => {}}
		on:click={() => {
			dialog_?.showModal();
		}}
	>
		<img {alt} src={coverImage} />
	</div>
	<dialog bind:this={dialog_}>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		<img
			on:click={() => {
				dialog_?.close();
			}}
			{alt}
			src={coverImage}
		/>
	</dialog>
{:else}
	<Skeleton height="100%" width="100%" />
{/if}

<style lang="scss">
	.show-dialog {
		transition: filter 300ms ease-in-out;
		:hover {
			filter: brightness(75%);
		}
		img {
			border-radius: 0.5em;
			width: 100%;
		}
	}
	dialog {
		border-radius: 0.25em;
		border: none;
		padding: 0px;
		img {
			border-radius: 0.25em;
			width: 25vw;
		}
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		background-color: color-mix(in srgb, var(--main-background) 30%, transparent);
	}
</style>
