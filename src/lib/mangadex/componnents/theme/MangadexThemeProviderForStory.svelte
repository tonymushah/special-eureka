<script lang="ts">
	import { custom } from "@mangadex/theme";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
	const theme = custom;
	import { mockWindows, clearMocks, mockIPC } from "@tauri-apps/api/mocks";
	import { onMount } from "svelte";
	/*
    onMount(() => {
		mockWindows("main");
		mockIPC(async (cmd, args) => {
			if (args.message.cmd == "close-context-menu") {
				const eventCallbackId = `_${args.message.onEventFn}`;
				const eventEmitter = window[eventCallbackId];
				eventEmitter({
					event: "close-context-menu",
					payload: "some data sent from the process"
				});
			}
		});
		return clearMocks;
	});
    */
</script>

<MangadexThemeProviderBase {theme}>
	<slot />
</MangadexThemeProviderBase>
