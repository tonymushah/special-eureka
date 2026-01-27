<script lang="ts">
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { Portal } from "@ark-ui/svelte/portal";
	import UploadDialogBody from "./dialog/UploadDialogBody.svelte";
	import cssDialogMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";
	import MangaDexVarThemeProvider from "../theme/MangaDexVarThemeProvider.svelte";
	import cssMod from "./upload-dialog.module.scss";

	interface Props {
		mangaId: string;
		title?: string;
		ondone?: (sessionId: string) => void;
		open?: boolean;
	}
	let { mangaId, title: propsTitle, open: propsOpen = $bindable(), ondone }: Props = $props();
</script>

<Dialog.Root bind:open={propsOpen}>
	<Portal>
		<Dialog.Backdrop class={cssDialogMod.overlay} />
		<Dialog.Positioner>
			<MangaDexVarThemeProvider>
				<Dialog.Content class={cssDialogMod.dialog}>
					<div class="content">
						<div class="top">
							<div class="title-desc">
								<Dialog.Title class={cssDialogMod.title}>Create an upload session</Dialog.Title>
								{#if propsTitle}
									<Dialog.Description class={cssDialogMod.description}
										>for `{propsTitle}`</Dialog.Description
									>
								{/if}
							</div>
							<div class="close">
								<Dialog.CloseTrigger class={cssDialogMod.closeButton}>
									<CloseIcon class={cssMod.icon} />
								</Dialog.CloseTrigger>
							</div>
						</div>
						<UploadDialogBody
							{mangaId}
							ondone={(sessionId) => {
								ondone?.(sessionId);
							}}
						/>
					</div>
				</Dialog.Content>
			</MangaDexVarThemeProvider>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

<style lang="scss">
	.content {
		height: 100%;
		display: flex;
		//grid-template-rows: fit-content auto;
		flex-direction: column;
	}
	.top {
		justify-content: space-between;
		display: flex;
		.title-desc {
			display: grid;
		}
	}
</style>
