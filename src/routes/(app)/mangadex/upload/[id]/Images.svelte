<script lang="ts">
	import PrimaryButton from "@mangadex/componnents/theme/buttons/PrimaryButton.svelte";
	import { addErrorToast } from "@mangadex/componnents/theme/toast/Toaster.svelte";
	import { addFilesToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/add-files";
	import { removeFileToInternalSessionMutation } from "@mangadex/gql-docs/upload/session/mutations/remove-file";
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
</script>

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
		}}>Add images</PrimaryButton
	>
</div>

<div class="images">
	{#each images as image, index (image)}
		<img
			animate:flip={{
				duration: 200
			}}
			transition:fade={{
				duration: 200
			}}
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
	{/each}
</div>

<style lang="scss">
	@use "@special-eureka/core/sass/_breakpoints.scss" as bp;
	@use "sass:map";

	.images-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
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
</style>
