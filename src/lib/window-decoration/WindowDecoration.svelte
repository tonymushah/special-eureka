<script lang="ts" context="module">
	import { derived, writable } from "svelte/store";
	import defaultLogo from "./app-icon.png";
	import { appWindow } from "@tauri-apps/api/window";

	export type ButtonStyles = {
		default: string;
		hover: string;
		active: string;
	};

	export type WindowDecorationStyle = {
		textColor: string;
		background: string;
		backgroundOnHover: string;
		minBackground?: ButtonStyles;
		maxBackground?: ButtonStyles;
		closeBackground?: ButtonStyles;
		menuBackground?: ButtonStyles;
	};

	export const logo = writable(defaultLogo);
	export const title = writable("Special Eureka");
	export const fonts = writable("Arial");
	export const style = writable<WindowDecorationStyle>({
		textColor: "#000",
		background: "#eee",
		backgroundOnHover: "#ddd"
	});
</script>

<script lang="ts">
	import { MaximizeIcon, MinimizeIcon, MinusIcon, XIcon } from "svelte-feather-icons";
	import DragRegion from "./DragRegion.svelte";
	import { onDestroy, onMount } from "svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";

	let isMaximize = false;
	let unlistens: UnlistenFn[] = [];
	async function isMaximized() {
		isMaximize = await appWindow.isMaximized();
	}
	onMount(async () => {
		unlistens.push(
			await appWindow.onScaleChanged(() => {
				isMaximized();
			})
		);
		unlistens.push(
			await appWindow.onMoved(() => {
				isMaximized();
			})
		);
	});
	onDestroy(() => {
		unlistens.forEach((u) => u());
	});
	$: appWindow.setTitle($title);
	const textColor = derived(style, ($style) => $style.textColor);
	const background = derived(style, ($s) => $s.background);
	const backgroundOnHover = derived(style, ($style) => $style.backgroundOnHover);
	const minBack = derived(style, ($style) => $style.minBackground?.default ?? "#4F6");
	const maxBack = derived(style, ($style) => $style.maxBackground?.default ?? "#46F");
	const closeBack = derived(style, ($style) => $style.closeBackground?.default ?? "#F46");
	const minBackHover = derived(style, ($style) => $style.minBackground?.hover ?? "#3d4");
	const maxBackHover = derived(style, ($style) => $style.maxBackground?.hover ?? "#24d");
	const closeBackHover = derived(style, ($style) => $style.closeBackground?.hover ?? "#d25");
	const minBackActive = derived(style, ($style) => $style.minBackground?.active ?? "#2c0");
	const maxBackActive = derived(style, ($style) => $style.maxBackground?.active ?? "#02c");
	const closeBackActive = derived(style, ($style) => $style.closeBackground?.active ?? "#b03");
</script>

<DragRegion
	--textColor={$textColor}
	--background={$background}
	--backgroundOnHover={$backgroundOnHover}
	--minBack={$minBack}
	--maxBack={$maxBack}
	--closeBack={$closeBack}
	--minBackHover={$minBackHover}
	--maxBackHover={$maxBackHover}
	--closeBackHover={$closeBackHover}
	--minBackActive={$minBackActive}
	--maxBackActive={$maxBackActive}
	--closeBackActive={$closeBackActive}
	--fonts={$fonts}
>
	<div class="title-bar" data-tauri-drag-region>
		<div class="title" data-tauri-drag-region>
			<img data-tauri-drag-region src={$logo} alt="icon" />
			<h4 data-tauri-drag-region>{$title}</h4>
		</div>
		<div class="actions-icons">
			<button
				class="min"
				on:click={() => {
					appWindow.minimize();
				}}
				on:contextmenu|preventDefault={() => {
					appWindow.hide();
				}}
			>
				<MinusIcon />
			</button>
			<button
				class="max"
				on:click={async () => {
					await appWindow.toggleMaximize();
					isMaximized();
				}}
			>
				{#if isMaximize}
					<MaximizeIcon />
				{:else}
					<MinimizeIcon />
				{/if}
			</button>
			<button
				class="close"
				on:click={async () => {
					await appWindow.close();
				}}
			>
				<XIcon />
			</button>
		</div>
	</div>
</DragRegion>

<style lang="scss">
	.title-bar {
		font-family: var(--fonts);
		display: flex;
		justify-content: space-between;
		width: 100vw;
		.title {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 12px;
			h4 {
				margin: 0px;
				font-weight: 900;
				font-size: larger;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			img {
				width: 25px;
				padding-left: 5px;
			}
		}
		.actions-icons {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 5px;
			padding-right: 5px;
			button {
				color: var(--textColor);
				border-radius: 0.25em;
				border: none;
				display: flex;
				justify-content: center;
				align-content: center;
			}
			.min {
				background-color: var(--minBack);
			}
			.max {
				background-color: var(--maxBack);
			}
			.close {
				background-color: var(--closeBack);
			}
			.min:hover {
				background-color: var(--minBackHover);
			}
			.max:hover {
				background-color: var(--maxBackHover);
			}
			.close:hover {
				background-color: var(--closeBackHover);
			}
			.min:active {
				background-color: var(--minBackActive);
			}
			.max:active {
				background-color: var(--maxBackActive);
			}
			.close:active {
				background-color: var(--closeBackActive);
			}
		}
	}
</style>
