<script lang="ts">
	import { type MangadexTheme } from "@mangadex/theme";
	import { setMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import { toStore } from "svelte/store";
	import { setMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import MangaDexVarThemeProvider from "./MangaDexVarThemeProvider.svelte";

	interface Props {
		theme: MangadexTheme;
		fonts?: string;
		children?: import("svelte").Snippet;
	}
	let { theme = $bindable(), fonts = "Poppins", children }: Props = $props();

	const theme_store = toStore(
		() => theme,
		(t) => (theme = t)
	);
	setMangaDexThemeContextWritable(theme_store);
	const fontStore = toStore(
		() => fonts,
		(f) => (fonts = f)
	);
	setMangaDexFontsContext(fontStore);
</script>

<MangaDexVarThemeProvider>
	{@render children?.()}
</MangaDexVarThemeProvider>
