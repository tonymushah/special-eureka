<script lang="ts">
	import { autoPlacement, autoUpdate } from "@floating-ui/dom";
	import { arrow, computePosition, offset, shift } from "@floating-ui/dom";
	import ButtonAccent from "@mangadex/componnents/theme/buttons/ButtonAccent.svelte";
	import MidToneLine from "@mangadex/componnents/theme/lines/MidToneLine.svelte";
	import { downloadTitleWithExtra } from "@mangadex/gql-docs/title/id/download-with-extras";
	import { MangaDownloadExtras } from "@mangadex/gql/graphql";
	import { isLogged } from "@mangadex/utils/auth";
	import { ListIcon } from "@lucide/svelte";

	let layout: HTMLElement | undefined = $state();
	let popover: HTMLDivElement | undefined = $state(undefined);
	let arrowElement: HTMLDivElement | undefined = $state(undefined);
	let open = $state(false);
	interface Props {
		id: string;
		onReverseClick?: () => void;
		disableReverse?: boolean;
		disableDownloads?: boolean;
		disableMarkAsRead?: boolean;
		hasUnread?: boolean;
		onreadmarks?: () => void;
	}
	let {
		id,
		onReverseClick,
		disableReverse,
		disableDownloads,
		disableMarkAsRead,
		hasUnread,
		onreadmarks
	}: Props = $props();
	async function update() {
		if (layout && popover && arrowElement) {
			const { x, y, placement, middlewareData } = await computePosition(layout, popover, {
				middleware: [
					offset(6),
					autoPlacement(),
					shift({
						padding: 5
					}),
					arrow({
						element: arrowElement,
						padding: -10
					})
				]
			});
			Object.assign(popover.style, {
				left: `${x}px`,
				top: `${y}px`
			});
			const arrow_ = middlewareData.arrow;
			if (arrow_) {
				const { x: arrowX, y: arrowY } = arrow_;
				const staticSide = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[placement.split("-")[0]];

				Object.assign(arrowElement.style, {
					left: arrowX != null ? `${arrowX}px` : "",
					top: arrowY != null ? `${arrowY}px` : "",
					right: "",
					bottom: "",
					[staticSide]: "-4px"
				});
			}
		}
	}
	function showPopover() {
		if (popover) {
			popover.style.display = "grid";
			update();
		}
	}

	function hidePopover() {
		if (popover) {
			popover.style.display = "";
		}
	}
	$effect(() => {
		if (open == true) {
			showPopover();
			// I wonder if it is a good idea though?
			if (layout && popover && arrowElement) {
				return autoUpdate(layout, popover, update);
			}
		} else {
			hidePopover();
		}
	});
</script>

<span bind:this={layout}>
	<ButtonAccent
		onclick={() => {
			open = !open;
		}}
	>
		<ListIcon />
	</ButtonAccent>
</span>

<div class="tooltip" role="tooltip" bind:this={popover}>
	{#if $isLogged}
		<button
			disabled={disableMarkAsRead}
			onclick={() => {
				open = false;
				onreadmarks?.();
			}}
		>
			{#if hasUnread}
				Mark all chapter as read
			{:else}
				Mark all chapter as not read
			{/if}
		</button>
	{/if}
	<button
		onclick={() => {
			open = false;
			onReverseClick?.();
		}}
		disabled={disableReverse}
	>
		Reverse order
	</button>
	<button
		onclick={() => {
			open = false;
			downloadTitleWithExtra(id, MangaDownloadExtras.AllChapters);
		}}
		disabled={disableDownloads}
	>
		Download all chapters
	</button>
	<button
		onclick={() => {
			open = false;
			downloadTitleWithExtra(id, MangaDownloadExtras.Unreads);
		}}
		disabled={disableDownloads}
	>
		Download all unread chapters
	</button>
	<button
		onclick={() => {
			open = false;
			downloadTitleWithExtra(id, MangaDownloadExtras.UnDownloadeds);
		}}
	>
		Download all un-downloaded chapters
	</button>
	<button
		onclick={() => {
			open = false;
			downloadTitleWithExtra(id, MangaDownloadExtras.UnReadUnDownloadeds);
		}}
		disabled={disableDownloads}
	>
		Download all un-read un-downloaded chapters
	</button>
	<div class="arrow" bind:this={arrowElement}></div>
</div>

<style lang="scss">
	.tooltip {
		display: none;
		border: var(--primary) 3px solid;
		background: var(--accent-l1);
		color: var(--text-color);
		font-weight: bold;
		border-radius: 4px;
		width: max-content;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 10;
	}
	.arrow {
		position: absolute;
		background: var(--accent-l1);
		width: 8px;
		height: 8px;
		transform: rotate(45deg);
	}
	button {
		background-color: var(--accent-l1);
		border-radius: 0px;
		transition: background-color 50ms ease-in-out;
		z-index: 11;
		padding: 5px;
		font-family: var(--fonts);
		font-size: var(--font-size);
		border: none;
		color: var(--text-color);
		text-align: left;
		border-bottom: 1px solid var(--mid-tone);
	}
	button:hover {
		background-color: var(--accent-l1-hover);
	}
	button:active {
		background-color: var(--accent-l1-active);
	}
	button:disabled {
		background-color: var(--accent);
	}
</style>
