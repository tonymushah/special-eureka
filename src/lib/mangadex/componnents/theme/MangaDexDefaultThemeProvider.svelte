<script lang="ts">
	import defaultTheme from "@mangadex/theme/graphql/defaultTheme";
	import { setMangaDexThemeContextWritable } from "@mangadex/utils/contexts";
	import { setMangaDexFontsContext } from "@mangadex/utils/contexts/fonts";
	import { writable } from "svelte/store";
	import MangaDexVarThemeProvider from "./MangaDexVarThemeProvider.svelte";
	import MangadexBackground from "./MangadexBackground.svelte";
	import Toaster from "./toast/Toaster.svelte";

	export let fonts = "Poppins";
	$: setMangaDexThemeContextWritable(defaultTheme);
	$: setMangaDexFontsContext(writable(fonts));
</script>

<MangaDexVarThemeProvider>
	<Toaster />
	<MangadexBackground>
		<slot />
	</MangadexBackground>
</MangaDexVarThemeProvider>
