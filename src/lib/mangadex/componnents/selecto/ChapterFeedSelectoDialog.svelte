<script lang="ts" module>
	import { createDialog, melt } from "@melt-ui/svelte";

	export type SelectoDialogData = {
		titles?: string[];
		chapters?: string[];
	};
	const selected = writable<SelectoDialogData | null | undefined>();
	const nothingSelected = der(selected, ($selected) => {
		return ($selected?.chapters?.length ?? 0) == 0 && ($selected?.titles?.length ?? 0) == 0;
	});
	const {
		elements: { trigger, portalled, overlay, content, title, description, close },
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
</script>

<script lang="ts">
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import { XIcon as CloseIcon } from "svelte-feather-icons";
	import { derived as der, get, writable } from "svelte/store";
	import { fade } from "svelte/transition";
	import { dev } from "$app/environment";
	import { makeScroll, preventScroll } from "../layout/scrollElement";
	const mangasLen = der(selected, (d) => d?.titles?.length ?? 0);
	const chaptersLen = der(selected, (d) => d?.chapters?.length ?? 0);

	const mangadexScrollContainer = document.getElementById("mangadex-scroll-container");
	$effect(() => {
		if (mangadexScrollContainer && $isOpened) {
			preventScroll();
			return () => {
				makeScroll();
			};
		}
	});
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
			<div class="top">
				<div class="title-desc">
					<h2 use:melt={$title}>Selecto</h2>
					{#if !$nothingSelected}
						<p use:melt={$description}>
							You have selected {$mangasLen} title{#if $mangasLen > 1}s{/if} and {$chaptersLen}
							chapter{#if $chaptersLen > 1}s{/if}.
						</p>
					{/if}
				</div>
				<div class="close">
					<ButtonAccent meltElement={close}>
						<CloseIcon />
					</ButtonAccent>
				</div>
			</div>
			<div class="body"></div>
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
		border: 2px solid var(--primary);
		border-radius: 3px;
		position: fixed;
		z-index: 50;
		transform: translateY(-50%);
		transform: translateX(-50%);
		top: 10vh;
		left: 50%;
		padding: 0.5rem; /* 24px */
		height: 75vh;
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
