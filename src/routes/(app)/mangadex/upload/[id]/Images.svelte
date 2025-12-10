<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import Tooltip from "@mangadex/componnents/Tooltip.svelte";
	import { addFilesToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/add-files";
	import { removeFileToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/remove-file";
	import { swapFileToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/swap-file";
	import { ContextMenuItemProvider } from "@special-eureka/core/commands/contextMenu";
	import registerContextMenuEvent from "@special-eureka/core/utils/contextMenuContext";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { getCurrentWindow, PhysicalPosition } from "@tauri-apps/api/window";
	import { onDestroy, onMount } from "svelte";
	import { flip } from "svelte/animate";
	import { fade } from "svelte/transition";

	interface Props {
		images: string[];
		sessionId: string;
		imagesPaths: string[];
	}
	let { images, sessionId, imagesPaths }: Props = $props();
	let addFilesMutation = addFilesToInternalSessionMutation();
	let removeFileMutation = removeFileToInternalSessionMutation();
	const t_window = getCurrentWindow();
	let unlistens: UnlistenFn[] = [];
	let toAddFiles: string[] = [];
	let overPhysicalPosition: PhysicalPosition | undefined = $state();
	let swapFileMutation = swapFileToInternalSessionMutation();
	onMount(async () => {
		unlistens.push(
			await t_window.onDragDropEvent((ev) => {
				console.log(ev);
				const payload = ev.payload;
				switch (payload.type) {
					case "enter":
						toAddFiles = payload.paths;
						overPhysicalPosition = payload.position;
						break;
					case "over":
						overPhysicalPosition = payload.position;
						break;
					case "drop":
						overPhysicalPosition = payload.position;
						addFilesMutation.mutate({
							sessionId,
							paths: toAddFiles
						});
						break;
					case "leave":
						toAddFiles = [];
						overPhysicalPosition = undefined;
						break;
				}
			})
		);
	});
	onDestroy(() => {
		unlistens.forEach((f) => f());
	});
	let selectedIndex = $state<number | undefined>();
</script>

<h4>Images</h4>

<div class="images-actions">
	<PrimaryButton
		disabled={addFilesMutation.isPending || removeFileMutation.isPending}
		onclick={() => {
			addFilesMutation.mutate(
				{ sessionId },
				{
					onError(error) {
						addErrorToast("Cannot import images", error);
					}
				}
			);
		}}
	>
		Add images
	</PrimaryButton>
</div>

<div class="images">
	{#each images as image, index (image)}
		<button
			class="img-sel"
			animate:flip={{
				duration: 200
			}}
			transition:fade={{
				duration: 200
			}}
			class:selected={selectedIndex == index}
			onclick={() => {
				if (selectedIndex == index) {
					selectedIndex = undefined;
				} else if (selectedIndex == undefined) {
					selectedIndex = index;
				} else {
					swapFileMutation.mutate(
						{
							sessionId,
							a: selectedIndex,
							b: index
						},
						{
							onSuccess() {
								selectedIndex = undefined;
							},
							onError(error) {
								addErrorToast("Cannot swap images", error);
							}
						}
					);
				}
			}}
			disabled={swapFileMutation.isPending}
		>
			<Tooltip>
				{#snippet triggerContent()}
					<img
						src={image}
						alt={`${index}-${image}`}
						oncontextmenu={registerContextMenuEvent({
							includeContext: false,
							addSeparator: false,
							preventDefault: true,
							stopPropagation: true,
							additionalMenus: () => [
								ContextMenuItemProvider.menuItem({
									text: "Remove image",
									action: () => {
										const path = imagesPaths.at(index);
										if (path)
											removeFileMutation.mutate(
												{
													sessionId,
													path
												},
												{
													onError(err) {
														addErrorToast("Cannot remove file", err);
													}
												}
											);
									},
									enabled: !!imagesPaths.at(index)
								})
							]
						})}
					/>
				{/snippet}
				{#snippet tooltipContent()}
					<span>{index + 1}</span>
				{/snippet}
			</Tooltip>
		</button>
	{/each}
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.images-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-bottom: 6px;
	}
	.images {
		display: grid;
		gap: 12px;
		margin-top: 12px;
		img {
			width: 100%;
			border-radius: 3px;
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "sm")) {
		.images {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "lg")) {
		.images {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xl")) {
		.images {
			grid-template-columns: repeat(4, 1fr);
		}
	}
	@include bp.media-only-screen-breakpoint-up(map.get(bp.$grid-breakpoints, "xxl")) {
		.images {
			grid-template-columns: repeat(5, 1fr);
		}
	}
	.img-sel {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: transparent;
		border: none;
		border-radius: 6px;
	}
	.img-sel:hover {
		background-color: var(--accent-l4-hover);
	}
	.img-sel:active {
		background-color: var(--accent-l4-active);
	}
	.img-sel.selected {
		img {
			border: 3px solid var(--mid-tone);
		}
	}
	h4 {
		margin: 0px;
		text-decoration: underline;
	}
</style>
