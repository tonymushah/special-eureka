<script lang="ts">
	import defaultTheme from "@mangadex/theme/graphql/defaultTheme";
	import { setMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import { setMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import { writable } from "svelte/store";
	import MangaDexVarThemeProvider from "./MangaDexVarThemeProvider.svelte";
	import MangadexBackground from "./MangadexBackground.svelte";
	import Toaster from "./toast/Toaster.svelte";

	interface Props {
		fonts?: string;
		children?: import("svelte").Snippet;
	}

	let { fonts = "Poppins", children }: Props = $props();
	$effect.pre(() => {
		setMangaDexThemeContextWritable(defaultTheme);
	});
	$effect.pre(() => {
		setMangaDexFontsContext(writable(fonts));
	});
</script>

<MangaDexVarThemeProvider>
	<Toaster />
	<MangadexBackground>
		{@render children?.()}
	</MangadexBackground>
</MangaDexVarThemeProvider>
