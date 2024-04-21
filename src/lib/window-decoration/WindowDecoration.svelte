<script lang="ts" context="module">
	import { derived, writable } from "svelte/store";
	import defaultLogo from "./app-icon.png";
	import { appWindow } from "@tauri-apps/api/window";

	export type WindowDecorationStyle = {
		textColor: string;
		background: string;
		backgroundOnHover: string;
		minBackground?: string;
		maxBackground?: string;
		closeBackground?: string;
		minBackgroundHover?: string;
		maxBackgroundHover?: string;
		closeBackgroundHover?: string;
		minBackgroundActive?: string;
		maxBackgroundActive?: string;
		closeBackgroundActive?: string;
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
	const minBack = derived(style, ($style) => $style.minBackground ?? "#4F6");
	const maxBack = derived(style, ($style) => $style.maxBackground ?? "#46F");
	const closeBack = derived(style, ($style) => $style.closeBackground ?? "#F46");
	const minBackHover = derived(style, ($style) => $style.minBackgroundHover ?? "#4F6");
	const maxBackHover = derived(style, ($style) => $style.maxBackgroundHover ?? "#46F");
	const closeBackHover = derived(style, ($style) => $style.closeBackgroundHover ?? "#F46");
</script>

<DragRegion
	--textColor={$textColor}
	--background={$background}
	--backgroundOnHover={$backgroundOnHover}
	--minBack={$minBack}
	--maxBack={$maxBack}
	--closeBack={$closeBack}
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
		}
	}
</style>
