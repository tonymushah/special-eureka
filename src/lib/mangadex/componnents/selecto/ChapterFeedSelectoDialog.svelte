<script lang="ts">
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { Portal } from "@ark-ui/svelte/portal";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import ChapterFeedSelectoDialogBody from "./ChapterFeedSelectoDialogBody.svelte";
	import cssMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";
	import MangaDexVarThemeProvider from "../theme/MangaDexVarThemeProvider.svelte";
	import {
		setSelectoDialogContextData,
		type SelectoDialogContextData,
		type SelectoDialogData
	} from "./utils";
	interface Props {
		selected: SelectoDialogData;
		contextData?: SelectoDialogContextData;
		open: boolean;
	}
	let { selected, contextData, open = $bindable() }: Props = $props();
	setSelectoDialogContextData(() => contextData);
	let nothingSelected = $derived.by(() => {
		return (
			(selected?.chapters?.length ?? 0) == 0 &&
			(selected?.titles?.length ?? 0) == 0 &&
			(selected?.covers?.length ?? 0) == 0 &&
			(selected?.customLists?.length ?? 0) == 0 &&
			(selected?.scanGroups?.length ?? 0) == 0 &&
			(selected?.users?.length ?? 0) == 0
		);
	});
	let isOpened = $derived(open && nothingSelected == false);
	let mangasLen = $derived(selected?.titles?.length ?? 0);
	let chaptersLen = $derived(selected?.chapters?.length ?? 0);
	let coversLen = $derived(selected?.covers?.length ?? 0);
	let customListLen = $derived(selected?.customLists?.length ?? 0);
	let scanGroupsLen = $derived(selected?.scanGroups?.length ?? 0);
	let usersLen = $derived(selected?.users?.length ?? 0);
	let showBody = $derived(!nothingSelected);
	$inspect(isOpened);
</script>

<Dialog.Root
	bind:open={
		() => isOpened,
		(o) => {
			open = o;
		}
	}
	unmountOnExit
	lazyMount
>
	<Portal container={document.getElementById("mangadex-scroll-container") ?? undefined}>
		<Dialog.Backdrop class={cssMod.overlay} />
		<Dialog.Positioner>
			<MangaDexVarThemeProvider>
				<Dialog.Content class={cssMod.dialog}>
					<div class="content">
						<div class="top">
							<div class="title-desc">
								<Dialog.Title class={cssMod.title}>Selecto</Dialog.Title>
								{#if !nothingSelected}
									<Dialog.Description class={cssMod.description}>
										You have selected {mangasLen} title{#if mangasLen > 1}s{/if}{#if chaptersLen > 0}
											and {chaptersLen}
											chapter{#if chaptersLen > 1}s{/if}
										{/if}
										{#if coversLen >= 1}
											and {coversLen} cover{#if coversLen > 1}s{/if}
										{/if}
										{#if customListLen >= 1}
											and {customListLen} MD custom list{#if customListLen > 1}s{/if}
										{/if}
										{#if scanGroupsLen >= 1}
											and {scanGroupsLen} scanlation group{#if scanGroupsLen > 1}s{/if}
										{/if}
										{#if usersLen >= 1}
											and {usersLen} user{#if usersLen > 1}s{/if}{/if}.
									</Dialog.Description>
								{/if}
							</div>
							<div class="close">
								<Dialog.CloseTrigger class={cssMod.closeButton}>
									<CloseIcon />
								</Dialog.CloseTrigger>
							</div>
						</div>
						{#if showBody}
							<ChapterFeedSelectoDialogBody
								titles={selected?.titles}
								chapters={selected?.chapters}
								covers={selected?.covers}
								customLists={selected?.customLists}
								scanlationGroups={selected?.scanGroups}
								users={selected?.users}
							/>
						{/if}
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
	.close {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.top {
		justify-content: space-between;
		display: flex;
		.title-desc {
			display: grid;
		}
	}
</style>
