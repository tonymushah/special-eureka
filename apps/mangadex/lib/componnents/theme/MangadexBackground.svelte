<script lang="ts">
	import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
	interface Props {
		children?: import("svelte").Snippet;
	}

	let { children }: Props = $props();
	const appWindow = getCurrentWebviewWindow();

	const contextMenuCallBack = async (e: MouseEvent) => {
		await appWindow.emit("close-context-menu");
	};
</script>

<div oncontextmenu={contextMenuCallBack} role="document">
	{@render children?.()}
</div>

<style lang="scss">
	div {
		background-color: var(--main-background);
		height: -webkit-fill-available;
	}
</style>
