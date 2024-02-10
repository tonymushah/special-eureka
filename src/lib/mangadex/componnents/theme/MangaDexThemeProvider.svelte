<script lang="ts">
	import { buildSvelteUITheme, type MangadexTheme } from "@mangadex/theme";
	import MangadexBackground from "./MangadexBackground.svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
	import { SvelteUIProvider, createTheme } from "@svelteuidev/core";

	export let theme: MangadexTheme;
	export let fonts = "Poppins";
</script>

<MangadexThemeProviderBase {theme} {fonts}>
	<MangadexBackground>
		<slot />
	</MangadexBackground>
</MangadexThemeProviderBase>
