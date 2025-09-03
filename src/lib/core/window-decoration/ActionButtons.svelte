<script lang="ts">
	import { preventDefault } from "svelte/legacy";

	import { MaximizeIcon, MinimizeIcon, MinusIcon, XIcon } from "svelte-feather-icons";
	import { getCurrentWebviewWindow } from "@tauri-apps/api/webviewWindow";
	const appWindow = getCurrentWebviewWindow();
	interface Props {
		isMaximize: boolean;
		isMaximized: () => Promise<void>;
	}

	let { isMaximize, isMaximized }: Props = $props();
</script>

<div class="actions-icons">
	<button
		class="min"
		onclick={() => {
			appWindow.minimize();
		}}
		oncontextmenu={preventDefault(() => {
			appWindow.hide();
		})}
	>
		<MinusIcon />
	</button>
	<button
		class="max"
		onclick={async () => {
			await appWindow.toggleMaximize();
			isMaximized();
		}}
	>
		{#if isMaximize}
			<MinimizeIcon />
		{:else}
			<MaximizeIcon />
		{/if}
	</button>
	<button
		class="close"
		onclick={async () => {
			await appWindow.close();
		}}
	>
		<XIcon />
	</button>
</div>

<style lang="scss">
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
			transition: background-color 300ms ease-in-out;
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
		.min:hover {
			background-color: var(--minBackHover);
		}
		.max:hover {
			background-color: var(--maxBackHover);
		}
		.close:hover {
			background-color: var(--closeBackHover);
		}
		.min:active {
			background-color: var(--minBackActive);
		}
		.max:active {
			background-color: var(--maxBackActive);
		}
		.close:active {
			background-color: var(--closeBackActive);
		}
	}
</style>
