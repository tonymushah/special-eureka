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
	import DragRegion from "./DragRegion.svelte";
	import { onDestroy, onMount } from "svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import ActionButtons from "./ActionButtons.svelte";

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

	const menuBack = derived(style, ($style) => $style.menuBackground?.default ?? "#eee");
	const menuBackHover = derived(style, ($style) => $style.menuBackground?.hover ?? "#ccc");
	const menuBackActive = derived(style, ($style) => $style.menuBackground?.active ?? "#aaa");
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
	--menuBack={$menuBack}
	--menuBackHover={$menuBack}
	--menuBackActive={$menuBackActive}
>
	<div class="title-bar" data-tauri-drag-region>
		<div class="title" data-tauri-drag-region>
			<img data-tauri-drag-region src={$logo} alt="icon" />
			<h4 data-tauri-drag-region>{$title}</h4>
		</div>
		<ActionButtons bind:isMaximize {isMaximized} />
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
	}
</style>
