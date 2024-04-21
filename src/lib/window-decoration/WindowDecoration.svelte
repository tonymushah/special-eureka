<script lang="ts" context="module">
	import { derived, writable } from "svelte/store";
	import defaultLogo from "./app-icon.png";
	import { appWindow } from "@tauri-apps/api/window";

	export type WindowDecorationStyle = {
		textColor: string;
		background: string;
	};

	export const logo = writable(defaultLogo);
	export const title = writable("Special Eureka");
	export const style = writable<WindowDecorationStyle>({ textColor: "#000", background: "#eee" });
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
</script>

<DragRegion --textColor={$textColor} --background={$background}>
	<div class="title-bar">
		<div class="title">
			<img src={$logo} alt="icon" />
			<h4>{$title}</h4>
		</div>
		<div class="actions-icons">
			<button
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
		display: flex;
		justify-content: space-between;
	}
</style>
