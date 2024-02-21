<script lang="ts">
	import type { Item } from "./base";
	import ContextMenuBase from "./base/ContextMenuBase.svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { onDestroy, onMount } from "svelte";
	import { appWindow } from "@tauri-apps/api/window";

	export let items: Item[];
	export let tabindex: number | null;
	let isOpening = false;
	let isOpen = false;
	let unlisten: UnlistenFn[] = [];
	const contextMenuListen = async () => {
		return await appWindow.listen("close-context-menu", () => {
			if (!isOpening) {
				isOpen = false;
			}
		});
	};
	let contextMenuUnlisten: UnlistenFn | undefined = undefined;
	onMount(async () => {
		let unlisten_ = await contextMenuListen();
		contextMenuUnlisten = () => {
			unlisten_();
			contextMenuUnlisten = undefined;
		};
	});
	const unlistenAll = () => {
		unlisten.forEach((u) => {
			u();
		});
	};
	onDestroy(() => {
		if (contextMenuUnlisten) {
			contextMenuUnlisten();
		}
		unlistenAll();
	});
	let style: string = "";
	function refreshStyle(x: number, y: number) {
		style = `top: ${y}px; left: ${x}px`;
	}
	const close = async () => {
		await appWindow.emit("close-context-menu");
	};
	$: console.log(`isOpen: ${isOpen}`);
</script>

<div
	class="content"
	on:contextmenu={async (e) => {
		isOpening = true;
		if (contextMenuUnlisten) contextMenuUnlisten();
		e.preventDefault();
		try {
			await close();
			refreshStyle(e.x, e.y);
			isOpen = true;
		} finally {
			isOpening = false;
			let unlisten_ = await contextMenuListen();
			contextMenuUnlisten = () => {
				unlisten_();
				contextMenuUnlisten = undefined;
			};
		}
	}}
	role="document"
>
	<slot />
</div>

<div class="context-menu" class:isOpen {style}>
	<ContextMenuBase
		{items}
		{tabindex}
		on:menuItemClick={async () => {
			await close();
		}}
	/>
</div>

<style lang="scss">
	.context-menu {
		display: none;
		position: absolute;
		top: 0;
		left: 0;
	}
	.context-menu.isOpen {
		display: block;
	}
	.content {
		width: min-content;
	}
</style>
