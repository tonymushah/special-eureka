<script lang="ts" module>
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { readonly, writable } from "svelte/store";
	import Lists from "./Lists.svelte";
	import { add } from "lodash";

	const currentMangaId = writable<string | null>(null);

	export function addMangaToAList(id: string) {
		currentMangaId.set(id);
	}
	function unsetManga() {
		currentMangaId.set(null);
	}
	const isMutating_ = writable(false);

	export const isMutating = readonly(isMutating_);
</script>

<script lang="ts">
	let dialog: HTMLDialogElement | undefined = $state();
	let mutate: ((manga_id: string) => Promise<void> | undefined) | undefined = $state();
	function closeDialog() {
		dialog?.close();
		unsetManga();
	}
	$effect(() => {
		if ($currentMangaId) {
			dialog?.showModal();
		}
	});
</script>

<dialog bind:this={dialog}>
	<div class="content">
		<h3>Add to list</h3>

		{#if $currentMangaId}
			<Lists mangaId={$currentMangaId} bind:mutate bind:isMutating={$isMutating_} />
		{/if}
		<div class="bottom">
			{#if mutate && $currentMangaId}
				<PrimaryButtonOnlyLabel
					label={"Add to list"}
					disabled={$isMutating_}
					onclick={() => {
						mutate?.($currentMangaId)
							?.then(() => {
								addToast({
									data: {
										title: "Title Added/Removed to List(s) succefully",
										variant: "green"
									}
								});
							})
							.catch((e) => {
								const title = "Error on adding title to list(s)";
								addErrorToast(title, e);
							})
							.finally(() => {
								closeDialog();
							});
					}}
				/>
			{/if}

			<ButtonAccentOnlyLabel
				label="Close"
				onclick={() => {
					closeDialog();
				}}
			/>
		</div>
	</div>
</dialog>

<style lang="scss">
	h3 {
		margin: 0px;
		text-align: center;
	}
	dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 50vw;
		height: 65vh;
		border: 2px solid var(--primary);
		border-radius: 3px;
		padding: 12px;
		z-index: 30;
	}
	.bottom {
		display: flex;
		align-items: end;
		justify-content: center;
		gap: 8px;
	}
	.content {
		display: grid;
		gap: 12px;
		width: 100%;
		grid-template-rows: 1fr auto 1f 1fr;
		height: -webkit-fill-available;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
</style>
