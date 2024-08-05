<script lang="ts">
	import { appWindow } from "@tauri-apps/api/window";

	const contextMenuCallBack = async (e: MouseEvent) => {
		await appWindow.emit("close-context-menu");
	};
</script>

<div on:contextmenu={contextMenuCallBack} role="document">
	<slot />
</div>

<style lang="scss">
	div {
		background-color: var(--main-background);
		height: -webkit-fill-available;
	}
</style>
