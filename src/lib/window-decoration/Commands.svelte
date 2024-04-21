<script>
	import openNewWindow from "$lib/commands/openNewWindow";
	import toggleDecoration from "$lib/commands/toggleDecoration";
	import { appWindow } from "@tauri-apps/api/window";
</script>

<div class="commands">
	<button
		on:click={async () => {
			await appWindow.emit("redirect", "/");
		}}
	>
		Home
	</button>
	<button
		on:click={async () => {
			await openNewWindow();
		}}
	>
		New Window
	</button>
	<button
		on:click={async () => {
			await toggleDecoration();
		}}
	>
		Toggle Decoration
	</button>
</div>

<style lang="scss">
	.commands {
		display: flex;
		gap: 5px;
		justify-content: center;
		align-items: center;
		button {
			background-color: var(--menuBack);
			transition: background-color 300ms ease-in-out;
			color: var(--textColor);
			border: none;
			border-radius: 0.25em;
		}
		button:hover {
			background-color: var(--menuBackHover);
		}
		button:active {
			background-color: var(--menuBackActive);
		}
	}
</style>
