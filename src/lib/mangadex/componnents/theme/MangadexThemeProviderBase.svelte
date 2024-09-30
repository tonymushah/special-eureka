<script lang="ts">
	import { type MangadexTheme } from "@mangadex/theme";
	import SomeDiv from "./SomeDiv.svelte";
	import { setMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import { writable } from "svelte/store";
	import { setMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import Toaster from "./toast/Toaster.svelte";
	import MangaDexVarThemeProvider from "./MangaDexVarThemeProvider.svelte";

	export let theme: MangadexTheme;
	export let fonts = "Poppins";
	const theme_store = writable(theme);
	$: theme_store.set(theme);
    $: setMangaDexThemeContextWritable(theme_store);
	$: setMangaDexFontsContext(writable(fonts));
</script>

<MangaDexVarThemeProvider>
	<Toaster />
	<slot />
</MangaDexVarThemeProvider>
