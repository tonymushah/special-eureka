<script>
	import openNewWindow from "$lib/commands/openNewWindow";
	import toggleDecoration from "$lib/commands/toggleDecoration";
	import { appWindow } from "@tauri-apps/api/window";
</script>

<button
	class="flex-center"
	on:click={async () => {
		await appWindow.emit("redirect", "/");
	}}
>
	Home
</button>
<button
	class="flex-center"
	on:click={async () => {
		await openNewWindow();
	}}
>
	New Window
</button>
<button
	class="flex-center"
	on:click={async () => {
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
		font-weight: 900;
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
