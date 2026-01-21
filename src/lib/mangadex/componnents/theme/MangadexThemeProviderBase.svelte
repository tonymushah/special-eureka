<script lang="ts">
	import { type MangadexTheme } from "@mangadex/theme";
	import { setMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import { writable } from "svelte/store";
	import { setMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import MangaDexVarThemeProvider from "./MangaDexVarThemeProvider.svelte";

	interface Props {
		theme: MangadexTheme;
		fonts?: string;
		children?: import("svelte").Snippet;
		noToaster?: boolean;
	}

	let { theme, fonts = "Poppins", children }: Props = $props();
	const theme_store = writable(theme);
	$effect(() => {
		theme_store.set(theme);
	});
	$effect(() => {
		setMangaDexThemeContextWritable(theme_store);
	});
	$effect(() => {
		setMangaDexFontsContext(writable(fonts));
	});
</script>

<MangaDexVarThemeProvider>
	{@render children?.()}
</MangaDexVarThemeProvider>
