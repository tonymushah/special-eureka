<script lang="ts" module>
	export type SelectoDialogData = {
		titles?: string[];
		chapters?: string[];
		covers?: string[];
		customLists?: string[];
		scanGroups?: string[];
		users?: string[];
	};
	const selected = writable<SelectoDialogData | null | undefined>();
	const nothingSelected = der(selected, ($selected) => {
		return (
			($selected?.chapters?.length ?? 0) == 0 &&
			($selected?.titles?.length ?? 0) == 0 &&
			($selected?.covers?.length ?? 0) == 0 &&
			($selected?.customLists?.length ?? 0) == 0 &&
			($selected?.scanGroups?.length ?? 0) == 0 &&
			($selected?.users?.length ?? 0) == 0
		);
	});
	const open = writable(false);
	export function openSelectoDialog(data: SelectoDialogData) {
		selected.set(data);
		open.set(true);
	}
	const isOpened = der(
		[open, nothingSelected],
		([$open, $nothingSelected]) => $open == true && $nothingSelected == false
	);
	const mangasLen = der(selected, (d) => d?.titles?.length ?? 0);
	const chaptersLen = der(selected, (d) => d?.chapters?.length ?? 0);
	const coversLen = der(selected, (d) => d?.covers?.length ?? 0);
	const customListLen = der(selected, (d) => d?.customLists?.length ?? 0);
	const scanGroupsLen = der(selected, (d) => d?.scanGroups?.length ?? 0);
	const usersLen = der(selected, (d) => d?.users?.length ?? 0);
</script>

<script lang="ts">
	import { Dialog } from "@ark-ui/svelte/dialog";
	import { Portal } from "@ark-ui/svelte/portal";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import { derived as der, writable } from "svelte/store";
	import ChapterFeedSelectoDialogBody from "./ChapterFeedSelectoDialogBody.svelte";
	import cssMod from "@mangadex/componnents/theme/dialog/dialog.module.scss";
	import MangaDexVarThemeProvider from "../theme/MangaDexVarThemeProvider.svelte";
</script>

<Dialog.Root
	bind:open={
		() => $isOpened,
		(o) => {
			$open = o;
		}
	}
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
								{#if !$nothingSelected}
									<Dialog.Description class={cssMod.description}>
										You have selected {$mangasLen} title{#if $mangasLen > 1}s{/if}{#if $chaptersLen > 0}
											and {$chaptersLen}
											chapter{#if $chaptersLen > 1}s{/if}
										{/if}
										{#if $coversLen >= 1}
											and {$coversLen} cover{#if $coversLen > 1}s{/if}
										{/if}
										{#if $customListLen >= 1}
											and {$customListLen} MD custom list{#if $customListLen > 1}s{/if}
										{/if}
										{#if $scanGroupsLen >= 1}
											and {$scanGroupsLen} scanlation group{#if $scanGroupsLen > 1}s{/if}
										{/if}
										{#if $usersLen >= 1}
											and {$usersLen} user{#if $usersLen > 1}s{/if}{/if}.
									</Dialog.Description>
								{/if}
							</div>
							<div class="close">
								<Dialog.CloseTrigger class={cssMod.closeButton}>
									<CloseIcon />
								</Dialog.CloseTrigger>
							</div>
						</div>
						{#if $selected?.titles?.length != 0 || $selected?.chapters?.length != 0 || $selected?.covers?.length != 0 || $selected?.customLists?.length != 0 || $selected?.scanGroups?.length != 0 || $selected?.users?.length != 0}
							<ChapterFeedSelectoDialogBody
								titles={$selected?.titles}
								chapters={$selected?.chapters}
								covers={$selected?.covers}
								customLists={$selected?.customLists}
								scanlationGroups={$selected?.scanGroups}
								users={$selected?.users}
							/>
						{/if}
					</div>
				</Dialog.Content>
			</MangaDexVarThemeProvider>
		</Dialog.Positioner>
	</Portal>
</Dialog.Root>

<!-- 
{#if $isOpened}
	<div use:melt={$portalled} class="portalled">
		<div use:melt={$overlay} class="overlay" transition:fade={{ duration: 150 }}></div>
		<div
			class="dialog"
			use:melt={$content}
			transition:fade={{
				duration: 150
			}}
		>
			<div class="content">
				<div class="top">
					<div class="title-desc">
						<h2 use:melt={$title}>Selecto</h2>
						{#if !$nothingSelected}
							<p use:melt={$description}>
								You have selected {$mangasLen} title{#if $mangasLen > 1}s{/if}
								{#if $chaptersLen > 0}, {$chaptersLen} chapter{#if $chaptersLen > 1}s{/if}{/if}
								{#if $coversLen > 0}, {$coversLen}cover{#if $coversLen > 1}s{/if}{/if}
								{#if $customListLen > 0}, {$customListLen} custom list{#if $customListLen > 1}s{/if}{/if}
								{#if $scanGroupsLen > 0}, {$scanGroupsLen} scanlation group{#if $scanGroupsLen > 1}s{/if}{/if}
								{#if $usersLen > 0}, {$usersLen} user{#if $usersLen > 1}s{/if}{/if}.
							</p>
						{/if}
					</div>
					<div class="close">
						<ButtonAccent meltElement={close}>
							<CloseIcon />
						</ButtonAccent>
					</div>
				</div>
				<ChapterFeedSelectoDialogBody
					titles={$selected?.titles ?? []}
					chapters={$selected?.chapters ?? []}
					covers={$selected?.covers ?? []}
					customLists={$selected?.customLists ?? []}
					scanlationGroups={$selected?.scanGroups ?? []}
					users={$selected?.users ?? []}
				/>
			</div>
		</div>
	</div>
{/if}
-->

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
