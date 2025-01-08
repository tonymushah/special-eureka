<script>
	import openNewWindow from "$lib/commands/openNewWindow";
	import toggleDecoration from "$lib/commands/toggleDecoration";
	import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
const appWindow = getCurrentWebviewWindow()
</script>

<button
	class="flex-center"
	onclick={async () => {
		await appWindow.emit("redirect", "/");
	}}
>
	Home
</button>
<button
	class="flex-center"
	onclick={async () => {
		await openNewWindow();
	}}
>
	New Window
</button>
<button
	class="flex-center"
	onclick={async () => {
		await toggleDecoration();
	}}
>
	Toggle Decoration
</button>

<style lang="scss">
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	button {
		background-color: var(--menuBack);
		transition: background-color 300ms ease-in-out;
		color: var(--textColor);
		border: none;
		border-radius: 0.25em;
		font-family: var(--fonts);
		font-weight: 600;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	button:hover {
		background-color: var(--menuBackHover);
	}
	button:active {
		background-color: var(--menuBackActive);
	}
</style>
