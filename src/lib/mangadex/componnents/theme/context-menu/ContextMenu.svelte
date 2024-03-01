<script lang="ts">
	import type { Item } from "./base";
	import ContextMenuBase from "./base/ContextMenuBase.svelte";
	import type { UnlistenFn } from "@tauri-apps/api/event";
	import { onDestroy, onMount } from "svelte";
	import { appWindow } from "@tauri-apps/api/window";
	import { computePosition } from "@floating-ui/dom";
	import { flip } from "@floating-ui/dom";

	export let items: (Item | undefined)[];
	export let tabindex: number | null;
	export let font_size: string = "var(--font-size)";
	export let menu_padding: string = "0.5em";
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

	let contextMenu: HTMLDivElement;
	let anchor: HTMLDivElement;
	const close = async () => {
		await appWindow.emit("close-context-menu");
	};
	function refreshAnchorPos(x: number, y: number) {
		anchor.style.top = `${y}px`;
		anchor.style.left = `${x}px`;
	}
	async function refreshStyle() {
		const { x: _x, y: _y } = await computePosition(anchor, contextMenu, {
			middleware: [flip()],
			placement: "bottom-start"
		});
		Object.assign(contextMenu.style, {
			top: `${_y}px`,
			left: `${_x}px`
		});
	}
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
	$: console.log(`isOpen: ${isOpen}`);
</script>

<div
	class="content"
	on:contextmenu={async (e) => {
		refreshAnchorPos(e.x, e.y);
		isOpening = true;
		if (contextMenuUnlisten) contextMenuUnlisten();
		e.preventDefault();
		try {
			await close();
			await refreshStyle();
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
	<div class="cm" bind:this={anchor} />
	<slot />
</div>

<div class="context-menu" class:isOpen bind:this={contextMenu}>
	<ContextMenuBase
		{menu_padding}
		{font_size}
		{items}
		{tabindex}
		on:menuItemClick={async () => {
			await close();
		}}
	/>
</div>

<style lang="scss">
	.cm {
		position: absolute;
	}
	.context-menu {
		display: none;
		position: absolute;
		top: 0px;
		left: 0px;
	}
	.context-menu.isOpen {
		display: block;
	}
	.content {
		width: min-content;
		display: contents;
	}
</style>
