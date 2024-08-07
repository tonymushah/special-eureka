<script lang="ts">
	import { derived } from "svelte/store";
	import { getCurrentChapterReadingModeWritable } from "../../../contexts/currentChapterReadingMode";
	import { ReadingMode } from "@mangadex/gql/graphql";
	import ButtonAccentOnlyLabel from "@mangadex/componnents/theme/buttons/ButtonAccentOnlyLabel.svelte";
	import Icon from "./reading-mode/Icon.svelte";
	import SettingsTransitComp from "./utils/SettingsTransitComp.svelte";
	import { createPopover, melt } from "@melt-ui/svelte";
	import MangaDexVarThemeProvider from "@mangadex/componnents/theme/MangaDexVarThemeProvider.svelte";
	import { slide } from "svelte/transition";
	import {
		BookOpenIcon,
		FileIcon,
		MoreHorizontalIcon,
		MoreVerticalIcon
	} from "svelte-feather-icons";

	const mode = getCurrentChapterReadingModeWritable();
	const label = derived(mode, ($mode) => {
		switch ($mode) {
			case ReadingMode.DoublePage:
				return "Double Page";

			case ReadingMode.LongStrip:
				return "Long Strip";
			case ReadingMode.SinglePage:
				return "Single Page";
			case ReadingMode.WideStrip:
				return "Wide Strip";
			default:
				return "Nothing Selected";
		}
	});
	const size = "18";
	const {
		elements: { content: menu, trigger, close },
		states: { open }
	} = createPopover({
		forceVisible: true,
		positioning: {
			placement: "bottom",
			fitViewport: true,
			sameWidth: true
		}
	});
</script>

<SettingsTransitComp>
	<div
		role="menu"
		tabindex="0"
		class="outer"
		on:contextmenu|preventDefault={() => {
			switch ($mode) {
				case ReadingMode.SinglePage:
					mode.set(ReadingMode.DoublePage);
					break;
				case ReadingMode.DoublePage:
					mode.set(ReadingMode.LongStrip);
					break;
				case ReadingMode.LongStrip:
					mode.set(ReadingMode.WideStrip);
					break;
				case ReadingMode.WideStrip:
					mode.set(ReadingMode.SinglePage);
					break;
				default:
					break;
			}
		}}
		use:melt={$trigger}
	>
		<ButtonAccentOnlyLabel variant="3" icon={Icon} label={$label} oneLine />
	</div>
</SettingsTransitComp>

{#if $open}
	<div class="menu-outer" use:melt={$menu}>
		<MangaDexVarThemeProvider>
			<menu transition:slide={{ duration: 150, axis: "y" }}>
				<li
					use:melt={$close}
					on:m-click={() => {
						mode.set(ReadingMode.SinglePage);
					}}
					class:isSelected={$mode == ReadingMode.SinglePage}
				>
					<div class="icon">
						<BookOpenIcon {size} />
					</div>
					<h4>Single Page</h4>
				</li>
				<li
					use:melt={$close}
					on:m-click={() => {
						mode.set(ReadingMode.DoublePage);
					}}
					class:isSelected={$mode == ReadingMode.DoublePage}
				>
					<div class="icon">
						<FileIcon {size} />
					</div>
					<h4>Double Page</h4>
				</li>
				<li
					use:melt={$close}
					on:m-click={() => {
						mode.set(ReadingMode.LongStrip);
					}}
					class:isSelected={$mode == ReadingMode.LongStrip}
				>
					<div class="icon">
						<MoreVerticalIcon {size} />
					</div>
					<h4>Longstrip</h4>
				</li>
				<li
					use:melt={$close}
					on:m-click={() => {
						mode.set(ReadingMode.WideStrip);
					}}
					class:isSelected={$mode == ReadingMode.WideStrip}
				>
					<div class="icon">
						<MoreHorizontalIcon {size} />
					</div>
					<h4>Widestrip</h4>
				</li>
			</menu>
		</MangaDexVarThemeProvider>
	</div>
{/if}

<style lang="scss">
	.menu-outer {
		display: flex;
		flex-direction: column;
		height: 200px;
	}
	.layout {
		flex: 3;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	menu {
		margin: 0px;
		border-radius: 0.25em;
		list-style: none;
		background-color: var(--accent);
		z-index: 10;
		overflow-y: scroll;
		color: var(--text-color);
		padding-left: 0em;
		li {
			padding-left: 1em;
			transition: background-color 200ms ease-in-out;
			display: flex;
			gap: 10px;
			h4 {
				margin: 0px;
				font-weight: 500;
			}
		}
		li:not(.isSelected):hover {
			background-color: var(--accent-hover);
		}
		li:not(.isSelected):active {
			background-color: var(--accent-active);
		}
		li.isSelected {
			background-color: var(--primary);
		}
	}
	.input {
		display: grid;
	}
	div.outer {
		display: grid;
	}
	div.icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
