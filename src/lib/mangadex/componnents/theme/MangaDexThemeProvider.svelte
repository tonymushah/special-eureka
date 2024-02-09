<script lang="ts">
	import { buildSvelteUITheme, type MangadexTheme } from "@mangadex/theme";
	import MangadexBackground from "./MangadexBackground.svelte";
	import MangadexThemeProviderBase from "./MangadexThemeProviderBase.svelte";
	import { SvelteUIProvider, createTheme } from "@svelteuidev/core";

	export let theme: MangadexTheme;
	export let fonts = "Poppins";
	$: svelte_ui_theme = buildSvelteUITheme(theme);
</script>

<MangadexThemeProviderBase {theme} {fonts}>
	<SvelteUIProvider bind:class={svelte_ui_theme} themeObserver={undefined}>
		<MangadexBackground>
			<slot />
		</MangadexBackground>
	</SvelteUIProvider>
</MangadexThemeProviderBase>
