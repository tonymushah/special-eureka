<script lang="ts">
	import { client } from "@mangadex/gql/urql";
	import { custom as theme } from "@mangadex/theme";
	import { setContextClient } from "@urql/svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
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
	setContextClient(client);
</script>

<MangadexThemeProviderBase {theme}>
	{@render children?.()}
</MangadexThemeProviderBase>
