<script lang="ts" module>
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import PrimaryButtonOnlyLabel from "@mangadex/componnents/theme/buttons/PrimaryButtonOnlyLabel.svelte";
	import { addErrorToast, addToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { readonly, writable } from "svelte/store";
	import Lists from "./Lists.svelte";
	import { mutationQueryMutation } from "./mutation";
	import type { ActionMode } from ".";
	import { client } from "@mangadex/gql/urql";
	import { SvelteMap } from "svelte/reactivity";

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
	function closeDialog() {
		dialog?.close();
		unsetManga();
	}
	$effect(() => {
		if ($currentMangaId) {
			dialog?.showModal();
		}
	});

	let addToListMut = mutationQueryMutation();
	$effect(() => {
		isMutating_.set(addToListMut.isPending);
	});
	let selectedListMap = $state(new SvelteMap<string, ActionMode>());
</script>

<dialog
	bind:this={dialog}
	onclose={() => {
		selectedListMap.clear();
	}}
>
	{#if $currentMangaId}
		<div class="content">
			<h3>Add to list</h3>

			<Lists mangaId={$currentMangaId} bind:selectedListMap />

			<div class="bottom">
				<PrimaryButtonOnlyLabel
					label={"Add/remove to list(s)"}
					disabled={$isMutating_ || selectedListMap.size == 0}
					onclick={() => {
						addToListMut.mutate(
							{
								title: structuredClone($currentMangaId),
								selectedListMap: structuredClone(selectedListMap),
								client
							},
							{
								onSettled() {
									closeDialog();
								},
								onSuccess() {
									addToast({
										title: "Title Added/Removed to List(s) succefully",
										type: "success"
									});
								},
								onError(e) {
									const title = "Error on adding title to list(s)";
									addErrorToast(title, e);
								}
							}
						);
					}}
				/>

				<ButtonAccentOnlyLabel
					label="Close"
					onclick={() => {
						closeDialog();
					}}
				/>
			</div>
		</div>
	{/if}
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
		overflow: hidden;
	}
	.bottom {
		display: flex;
		align-items: end;
		justify-content: center;
		gap: 8px;
	}
	.content {
		/* display: grid; */
		gap: 12px;
		width: 100%;
		/* grid-template-rows: 1fr auto 1fr 1fr; */
		display: flex;
		flex-direction: column;
		max-height: 100%;
	}
	dialog::backdrop {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
	}
</style>
