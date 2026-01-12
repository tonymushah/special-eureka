<script lang="ts" module>
	import { createDialog, melt } from "@melt-ui/svelte";

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
	const {
		elements: { portalled, overlay, content, title, description, close },
		states: { open }
	} = createDialog({
		portal: "#mangadex-scroll-container"
	});
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
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { XIcon as CloseIcon } from "@lucide/svelte";
	import { derived as der, writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import ChapterFeedSelectoDialogBody from "./ChapterFeedSelectoDialogBody.svelte";
</script>

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

<style lang="scss">
	.portaled {
		position: absolute;
		top: 0px;
		width: 100%;
		height: 100%;
	}
	.dialog {
		background-color: var(--main-background);
		color: var(--text-color);
		width: 75vw;
		border: 3px solid var(--primary);
		border-radius: 0.5rem;
		position: fixed;
		z-index: 50;
		transform: translateY(-50%);
		transform: translateX(-50%);
		top: 10vh;
		left: 50%;
		padding: 0.5rem; /* 24px */
		height: 75vh;
	}
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
	.overlay {
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		z-index: 50;
		inset: 0px;
		position: fixed;
	}
	.top {
		justify-content: space-between;
		display: flex;
		.title-desc {
			display: grid;
			h2 {
				margin: 0px;
			}
		}
		p {
			margin: 0px;
			font-weight: 800;
			font-size: large;
		}
	}
</style>
